import React from 'react'
import classes from '../styles/Donate.module.scss'

const Donate = () => {
    return (
        <div className={classes['Donate_Container']}>
            <h1>Donate</h1>
            <a className={classes['Donation_Box']} href="https://donorbox.org/test_nextjs">Donate</a>
        </div>
    )
}

export default Donate