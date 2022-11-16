import React from 'react'
import Card from '../../components/Card'
import Images from '../../components/Images'
import classes from '../../styles/Shop.module.scss'

import { SignJWT } from 'jose'
import { sign } from 'jsonwebtoken'
import axios from 'axios'
// import { headers } from '../../next.config'


const Shop = (props) => {
    const style = {
        // 'background-color': 'blue'
    }

    const handleClick = async () => {
        try {

            const secret = process.env.TOKEN_KEY
            // const token = sign({ message: 'message' }, secret)

            const token = await new SignJWT({ message: 'message' })
                .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
                .sign(new TextEncoder().encode(secret))

            console.log(token)
            // const test = new TextEncoder().encode(secret)
            // console.log(new TextEncoder().decode(test))
            const response = await axios.get('http://localhost:3000/api/hello', {
                headers: {
                    'x-access-token': token
                }
            })

            console.log(response)
        } catch (error) {
            // console.log(error)
            console.log(error.response.data.Message, error.response.status)
        }
    }

    return (
        <div style={style}>
            <Card images={Images} name='Fleece' price={100} />

            <h1 onClick={() => { handleClick() }}>test</h1>
        </div>
    )
}

export default Shop

export const getStaticProps = async () => {
    const secret = process.env.TOKEN_KEY

    const token = await new SignJWT({ message: 'message' })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secret))

    const response = await axios.get('http://localhost:3000/api/Stripe/products', {
        headers: {
            'x-access-token': token
        }
    })

    // console.log('space')
    // console.log(response.data.products.data)
    const products = response.data.products.data

    return {
        'props': {
            'result': products
        },
    }

}