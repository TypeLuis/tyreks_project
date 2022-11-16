import React from 'react'
import Card from '../../components/Card'
import classes from '../../styles/Shop.module.scss'

import { SignJWT } from 'jose'
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


            const response = await axios.get(`${process.env.BACKEND_URL}hello`, {
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
            {props.result.map((item, i) => {

                return (

                    <div key={i}>

                        <Card images={item.all_images} name={item.name} price={item.price} />
                    </div>
                )
            })}

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

    const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/products`, {
        headers: {
            'x-access-token': token
        }
    })

    const products = response.data.products.data

    const Retrieve_All_Data = async () => {

        const promises = []

        products.map(async (item, i) => {
            if (item.default_price) {

                const promise = new Promise(async (resolve, reject) => {

                    try {
                        const response = await axios.get(`${process.env.BACKEND_URL}/Stripe/price?price_data=${item.default_price}`, {
                            headers: {
                                'x-access-token': token
                            }
                        })
                        const price = response.data.price.unit_amount / 100
                        const checkImages = item.metadata.images
                        const obj = {
                            ...item,
                            price: price,
                            all_images: checkImages ? checkImages.split(',') : item.images
                        }

                        resolve(obj)

                    } catch (error) {
                        reject(error)
                    }

                })

                promises.push(promise);

            }

        })

        const result = await Promise.all(promises).then(r => r).catch(error => { throw error })

        return result
    }

    // console.log( await Retrieve_All_Data())

    return {
        'props': {
            'products': products,
            'result': await Retrieve_All_Data(),
        },
    }

}