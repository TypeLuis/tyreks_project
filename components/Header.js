import React from 'react'
import classes from '../styles/Header.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Header = () => {
    const router = useRouter()

    const navigator = (e) => {
        // console.log(e)
        router.push(`/${e.target.textContent}`)
    }
    return (
        <nav className={classes.navbar}>
            <ul>
                <li onClick={(e) => { navigator(e) }}>Home</li>
                <li>Shop</li>
                <li>Donate</li>
                <li>Videos</li>
            </ul>
        </nav>
    )
}

export default Header