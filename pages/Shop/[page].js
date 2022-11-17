import React, { useEffect, useState } from 'react'
// import useR from 'next/router'
import { useRouter } from 'next/router'
import ProductPage from '../../components/Product_Page/ProductPage'
import { SignJWT } from 'jose'
import axios from 'axios'



const Page = () => {
    const router = useRouter()
    const query = router.query.page
    console.log(router.query.page)

    return (
        <div>
            {/* <h1>{query}</h1> */}
            <ProductPage />

        </div>
    )
}

export default Page


// function that returns product from Stripe
const getProducts = async () => {
    const secret = process.env.TOKEN_KEY

    const token = await new SignJWT({ message: 'message' })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secret))

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

    console.log('AHHHH', context)
    return {
        'props': { 'hi': 'hi' }
    }
}