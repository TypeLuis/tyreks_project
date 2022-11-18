import React, { useEffect, useState } from 'react'
import { jwtVerify } from 'jose'
import { loadStripe } from '@stripe/stripe-js';
import classes from '../styles/Cart.module.scss'
import Functions from '../Functions';

const Cart = () => {
    const [cartItems, setCartItems] = useState()

    const handleChange = async (e, product) => {

        const cart = localStorage.getItem('cart')

        const secret = process.env.TOKEN_KEY;

        const shoppingCart = await (await jwtVerify(cart, new TextEncoder().encode(secret))).payload.message

        let res

        if (e.target.value === 'Remove') {
            // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
            res = shoppingCart.filter(item => item.name !== product.name)
        }
        else {

            product.quantity = Number(e.target.value)

            // https://stackoverflow.com/questions/37585309/replacing-objects-in-array
            res = shoppingCart.map(obj => [product].find(o => o.name === obj.name) || obj)
        }

        console.log(res)
        setCartItems(res)

        const token = await Functions.getToken(res)

        localStorage.setItem('cart', token)

    }

    useEffect(() => {
        const cart = localStorage.getItem('cart')

        const secret = process.env.TOKEN_KEY;

        jwtVerify(cart, new TextEncoder().encode(secret)).then(item => setCartItems(item.payload.message))

    }, [])
    return (
        <div className={classes.main}>
            <form action="/api/checkout_sessions" method="POST">
                <section>
                    <div className={classes.productList}>
                        {cartItems &&

                            cartItems.map((item, i) => {

                                return (
                                    <div key={i} className={classes.product}>
                                        <img src={item.image} />
                                        <div className={classes.info}>
                                            <span>{item.name}</span>
                                            <span>${item.price}</span>
                                        </div>
                                        <div className={classes.selection}>
                                            <span>Quantity</span>
                                            <select onChange={(e) => { handleChange(e, item) }}>
                                                <option value='Remove'>Remove</option>
                                                {Array.from({ length: item.maxQuantity }, (_, i) => i + 1).map((num, i) => {
                                                    const selected = num === item.quantity
                                                    return (
                                                        <>

                                                            {selected ?
                                                                <option value={num} selected="selected">{num}</option>

                                                                :
                                                                <option value={num}>{num}</option>
                                                            }
                                                        </>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                    <button className={classes.btn} type="submit" role="link">
                        Checkout
                    </button>
                </section>
            </form>
        </div>
    )
}

export default Cart