import React, { useEffect, useState } from 'react'
import axios from 'axios';
import classes from '../../styles/SuccessOrCancel.scss'

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
        <div>
            {customerData &&

                <section className={classes['order-info']} onClick={() => { handleTestClick() }}>
                    {customerData.customer.email}
                </section>

            }
        </div>
    )
}

export default Success
