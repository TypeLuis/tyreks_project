import React, { useEffect, useState } from 'react'
// import useR from 'next/router'
import { useRouter } from 'next/router'
import ProductPage from '../../components/Product_Page/ProductPage'
import { SignJWT } from 'jose'
import axios from 'axios'
import Functions from '../../Functions'
import classes from '../../styles/Error.module.scss'



const Page = (props) => {
    const router = useRouter()
    const query = router.query.page
    console.log(router)

    if (props.product.error) {
        return (
            <div className={classes.pageError}>
                <h1>Product <span>{query}</span> does not Exist</h1>
            </div>
        )
    }

    const { all_images, name, price, price_token } = props.product
    const maxQuantity = props.product.metadata.maxQuantity

    console.log(maxQuantity)



    return (
        <div>
            {/* <h1>{query}</h1> */}
            <ProductPage
                images={all_images}
                name={name}
                originalPrice={price}
                maxQuantity={maxQuantity}
                priceToken={price_token}
            />

        </div>
    )
}

export default Page


// export const getStaticPaths = async () => {

//     const products = await Functions.getProducts()


//     const paths = products.map(product => {
//         return {
//             params: { 'page': product.name }
//         }
//     })

//     return {
//         'paths': paths,
//         // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
//         'fallback': 'blocking'
//     }
// }


// export const getStaticProps = async (context) => {
//     const products = await Functions.getProducts()
//     const product = products.filter((product) => product.name === context.params.page)[0]

//     const obj = await Functions.getProductObject(product)

//     return {
//         'props': { 'product': obj },
//         revalidate: 1
//     }
// }

export const getServerSideProps = async (context) => {
    const products = await Functions.getProducts()
    const product = products.filter((product) => product.name === context.params.page)[0]
    const obj = await Functions.getProductObject(product)

    return {
        'props': { 'product': obj },
    }
}