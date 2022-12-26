import { SignJWT, jwtVerify } from 'jose'
import axios from 'axios'

const Functions = {}

// function that gets token, message key as a parameter
Functions.getToken = async (message) => {
    const secret = process.env.TOKEN_KEY

    const token = await new SignJWT({ message: message })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secret))
    return token
}

// function that returns all products from Stripe
Functions.getProducts = async () => {
    const token = await Functions.getToken()

    const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/products`, {
        headers: {
            'x-access-token': token
        }
    })

    const objs = response.data.products.data

    // filters products that aren't active
    const products = objs.filter((product) => product.active === true)

    return products
}

// Function that returns product obj with price and images included, product obj needed as parameter
Functions.getProductObject = async (product) => {
    const token = await Functions.getToken()

    let response
    let obj
    try {
        response = await axios.get(`${process.env.BACKEND_URL}/Stripe/price?price_data=${product.default_price}`, {
            headers: {
                'x-access-token': token
            }
        })

        const price = response.data.price.unit_amount / 100
        const checkImages = product.metadata.images
        obj = {
            ...product,
            price: price,
            all_images: checkImages ? checkImages.split(',') : product.images,
            price_token: await Functions.getToken(product.default_price)
        }

    } catch (error) {
        obj = { 'error': error.message }
    }

    return obj
}

export default Functions