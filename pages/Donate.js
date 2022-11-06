import React, { useEffect, useState } from 'react'
import classes from '../styles/Donate.module.scss'

const Donate = () => {
    const [show, setShow] = useState({
        'display': 'none',
        'opacity': 0
    })
    const frameStyle = {
        "padding": '125px 50px 100px 25px',
        "margin-left": '30px',

        'transition': '.5s ease-in',
        'display': show.display,
        "opacity": show.opacity,

        "max-width": "500px",
        "min-width": "250px",
        "max-height": "none!important"
    }

    const changeShow = () => {
        const reveal = {
            'display': 'block',
            'opacity': 1
        }
        const unveal = {
            'display': 'none',
            'opacity': 0
        }
        show.opacity === 0 ? setShow(reveal) : setShow(unveal)
        console.log(show)
    }
    return (
        <div className={classes['Donate_Container']}>
            <h1>Donate</h1>
            <a className={classes['Donation_Box']} href="https://donorbox.org/zombie-killer-death-trap" target="_blank" rel="noopener noreferrer">Donate</a>

            <div onClick={(() => { changeShow() })} className={`${classes['Donation_Box']} ${classes.Donate_Div}`}>Donate</div>

            {/* <span className={classes.Iframe_Div} style={{ 'display': show.display, 'width': '100%', "margin-left": '25px' }}> */}

            <iframe src="https://donorbox.org/embed/zombie-killer-death-trap" name="donorbox" allowpaymentrequest="allowpaymentrequest" seamless="seamless" frameborder="0" scrolling="no" height="700px" width="100%" style={frameStyle}></iframe>
            {/* </span> */}
        </div>
    )
}

export default Donate