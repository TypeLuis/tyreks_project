import React, { useEffect, useState } from 'react'
import axios from 'axios';
import classes from '../../styles/SuccessOrCancel.module.scss'

const Success = () => {
    const [customerData, setCustomerData] = useState()

    useEffect(() => {

        const query = new URLSearchParams(window.location.search);
        let sessionId = query.get('session_id')

        if (sessionId) {
            axios.get(`${process.env.BACKEND_URL}/Stripe/order_info?session_id=${sessionId}`).then(r => setCustomerData(r.data))

            // console.log(customer, session)
        }

    }, [])
    const handleTestClick = () => {
        console.log(customerData)
    }
    return (
        <div className={classes.Success}>
            {customerData &&

                <section className={classes['order-info']} onClick={() => { handleTestClick() }}>
                    {/* {customerData.customer.email} */}
                    <h1>Thank you for your Order!</h1>
                    <ul>
                        <li>Name: <span>{customerData.customer.name}</span></li>
                        <li>Email: <span>{customerData.customer.email}</span></li>
                    </ul>

                    <ul>
                        <li>Order Total: <span> ${customerData.session.amount_total / 100}</span></li>
                        <li>Payment Status: <span> {customerData.session.payment_status}</span></li>
                    </ul>

                    <p>
                        We appriciate your business!
                        If you have any questions, please email
                        <a href='mailto:orders@example.com'>orders@example.com</a>
                    </p>

                </section>

            }
        </div>
    )
}

export default Success
