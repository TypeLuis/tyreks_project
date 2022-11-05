import React, { useEffect } from 'react'
import classes from '../styles/Donate.module.scss'
import { useRef } from 'react'

const Donate = () => {
    const ref = useRef()

    useEffect(() => {
        console.log(ref)
    }, [])

    const frameStyle = {

        // "height": "max-content",
        "padding": '125px 50px 100px 25px',

        "max-width": "500px",
        "min-width": "250px",
        "max-height": "none!important"
    }
    return (
        <div className={classes['Donate_Container']}>
            <h1>Donate</h1>
            <a className={classes['Donation_Box']} href="https://donorbox.org/zombie-killer-death-trap" target="_blank" rel="noopener noreferrer">Donate</a>

            <iframe ref={ref} src="https://donorbox.org/embed/zombie-killer-death-trap" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="700px" width="100%" style={frameStyle}></iframe>
        </div>
    )
}

export default Donate