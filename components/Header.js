import React from 'react'
import classes from '../styles/Header.module.scss'

const Header = () => {
    return (
        <nav className={classes.navbar}>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>Donate</li>
                <li>Videos</li>
            </ul>
        </nav>
    )
}

export default Header