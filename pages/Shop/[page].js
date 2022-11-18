import React, { useEffect, useState } from 'react'
// import useR from 'next/router'
import { useRouter } from 'next/router'
import ProductPage from '../../components/Product_Page/ProductPage'
import { SignJWT } from 'jose'
import axios from 'axios'
import Functions from '../../Functions'



const Page = (props) => {
    const router = useRouter()
    const query = router.query.page
    // console.log(router.query.page)
    const { all_images, name, price } = props.product
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
            />

        </div>
    )
}

export default Page


export const getStaticPaths = async () => {

    const products = await Functions.getProducts()


    const paths = products.map(product => {
        return {
            params: { 'page': product.name }
        }
    })

    return {
        'paths': paths,
        'fallback': false
    }
}


export const getStaticProps = async (context) => {
    const products = await Functions.getProducts()
    const product = products.filter((product) => product.name === context.params.page)[0]

    const obj = await Functions.getProductObject(product)

    return {
        'props': { 'product': obj }
    }
}