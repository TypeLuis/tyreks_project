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

    // console.log(props)



    return (
        <div>
            {/* <h1>{query}</h1> */}
            <ProductPage
                images={all_images}
                name={name}
                originalPrice={price}
            />

        </div>
    )
}

export default Page


export const getStaticPaths = async () => {

    const products = await getProducts()


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

    // const token = await getToken()

    // const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/price?price_data=${product.default_price}`, {
    //     headers: {
    //         'x-access-token': token
    //     }
    // })
    // const price = response.data.price.unit_amount / 100
    // const checkImages = product.metadata.images
    // const obj = {
    //     ...product,
    //     price: price,
    //     all_images: checkImages ? checkImages.split(',') : product.images
    // }

    return {
        'props': { 'product': obj }
    }
}