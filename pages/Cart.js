import React, { useEffect, useState } from 'react'
import { jwtVerify } from 'jose'
import { loadStripe } from '@stripe/stripe-js';
import classes from '../styles/Cart.module.scss'

const Cart = () => {
    const [cartItems, setCartItems] = useState()



    const addItem = (newItem) => {

        function itemFilter(item) {
            return item.name === newItem.name && item.price === newItem.price
        }
        let existingItems = shoppingCart.filter(itemFilter)

        if (existingItems.length > 0) {
            existingItems[0].quantity += newItem.quantity
        } else {
            shoppingCart.push(newItem)
        }

    }

    useEffect(() => {
        const cart = localStorage.getItem('cart')

        const secret = process.env.TOKEN_KEY;

        const shoppingCart = jwtVerify(cart, new TextEncoder().encode(secret)).then(item => setCartItems(item.payload.message))

        console.log(shoppingCart.then(item => item?.payload.message))

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
                                            <select>
                                                <option>1</option>
                                                <option>2</option>
                                                <option selected="selected">3</option>
                                                <option>4</option>
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