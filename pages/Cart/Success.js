import React, { useEffect } from 'react'
import axios from 'axios';

const Success = () => {

    useEffect(() => {

        const query = new URLSearchParams(window.location.search);
        let sessionId = query.get('session_id')

        if (sessionId) {
            const { customer, session } = axios.get(`${process.env.BACKEND_URL}/Stripe/order_info?session_id=${sessionId}`).then(r => console.log(r.data))

            console.log(customer, session)
        }

    }, [])
    return (
        <div>Success</div>
    )
}

export default Success
