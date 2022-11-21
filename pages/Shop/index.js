import React, { useEffect } from 'react'
import Card from '../../components/Card'
import classes from '../../styles/Shop.module.scss'

import { SignJWT } from 'jose'
import axios from 'axios'
import Functions from '../../Functions'


const Shop = (props) => {
    const style = {
        // 'background-color': 'blue'
    }

    const handleClick = async () => {
        try {

            const token = await Functions.getToken('')

            const response = await axios.get(`${process.env.BACKEND_URL}/hello`, {
                headers: {
                    'x-access-token': token
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
            console.log(error.response.data.Message, error.response.status)
        }
    }

    useEffect(() => {
        console.log(props.result)
    }, [])


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
    const products = await Functions.getProducts()


    const Retrieve_All_Data = async () => {

        const promises = []

        products.map(async (product, i) => {
            if (product.default_price) {

                const promise = new Promise(async (resolve, reject) => {

                    try {
                        const obj = await Functions.getProductObject(product);
                        resolve(obj)
                    } catch (error) { reject(error) }

                })

                promises.push(promise);

            }

        })

        const result = await Promise.all(promises).then(r => r).catch(error => { throw error })

        return result
    }

    return {
        'props': {
            'products': products,
            'result': await Retrieve_All_Data(),
        },
    }

}