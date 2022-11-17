import { SignJWT, jwtVerify } from 'jose'
import axios from 'axios'

const Functions = {}


Functions.getToken = async (message) => {
    const secret = process.env.TOKEN_KEY

    const token = await new SignJWT({ message: message })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secret))
    return token
}

Functions.getProducts = async () => {
    const token = await Functions.getToken()

    const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/products`, {
        headers: {
            'x-access-token': token
        }
    })

    const products = response.data.products.data

    return products
}