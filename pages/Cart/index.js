import React, { useEffect, useState, useContext } from 'react'
import { jwtVerify } from 'jose'
import { loadStripe } from '@stripe/stripe-js';
import classes from '../../styles/Cart.module.scss'
import Functions from '../../Functions';
import { AppContext } from '../../context';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState()
    const { cartState } = useContext(AppContext)
    const [cartLength, setCartLength] = cartState

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
        setCartLength(res.length)

        const token = await Functions.getToken(res)

        localStorage.setItem('cart', token)

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await Functions.getToken('')
        const response = await axios({
            method: 'post',
            url: `${process.env.BACKEND_URL}/Stripe/checkout_sessions`,
            headers: { 'x-access-token': token },
            data: {
                cart: localStorage.getItem('cart')
            }
        })
        window.location = response.data.url
    }

    useEffect(() => {
        const cart = localStorage.getItem('cart')

        const secret = process.env.TOKEN_KEY;

        jwtVerify(cart, new TextEncoder().encode(secret)).then(item => setCartItems(item.payload.message))

        const query = new URLSearchParams(window.location.search);
        let sessionId = query.get('session_id')

        if (sessionId) {
            const { customer, session } = axios.get(`${process.env.BACKEND_URL}/Stripe/order_info?session_id=${sessionId}`).then(r => console.log(r.data))

            console.log(customer, session)
        }

    }, [])
    return (
        <div className={classes.main}>
            {cartItems && cartItems.length > 0 ?
                <form onSubmit={(e) => { handleSubmit(e) }} >
                    <section>
                        <div className={classes.productList}>

                            {cartItems.map((item, i) => {

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
                            })}

                        </div>
                        <button className={classes.btn} type="submit" role="link">
                            Checkout
                        </button>
                    </section>
                </form>

                :


                <div className={classes.noCart}>
                    <h1>
                        Cart is empty
                    </h1>
                </div>
            }
        </div>
    )
}

export default Cart