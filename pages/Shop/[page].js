import React, { useEffect, useState } from 'react'
// import useR from 'next/router'
import { useRouter } from 'next/router'
import ProductPage from '../../components/Product_Page/ProductPage'
import { SignJWT } from 'jose'
import axios from 'axios'



const Page = (props) => {
    const router = useRouter()
    const query = router.query.page
    // console.log(router.query.page)
    const { all_images, name, price } = props.product

    // console.log(name)



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

// function that gets token
const getToken = async () => {
    const secret = process.env.TOKEN_KEY

    const token = await new SignJWT({ message: 'message' })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secret))
    return token
}

// function that returns product from Stripe
const getProducts = async () => {
    const token = await getToken()

    const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/products`, {
        headers: {
            'x-access-token': token
        }
    })

    const products = response.data.products.data

    return products
}


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
    const products = await getProducts()
    const product = products.filter((product) => product.name === context.params.page)[0]

    const token = await getToken()
    const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/price?price_data=${product.default_price}`, {
        headers: {
            'x-access-token': token
        }
    })
    const price = response.data.price.unit_amount / 100
    const checkImages = product.metadata.images
    const obj = {
        ...product,
        price: price,
        all_images: checkImages ? checkImages.split(',') : product.images
    }

    return {
        'props': { 'product': obj }
    }
}