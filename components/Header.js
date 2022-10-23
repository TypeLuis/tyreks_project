import React from 'react'
import classes from '../styles/Header.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Header = () => {
    const router = useRouter()

    const navigator = (e) => {
        // console.log(e)
        e.target.textContent === 'Home' ? router.push(`/`) : router.push(`/${e.target.textContent}`)
        // router.push(`/${e.target.textContent}`)
    }
    return (
        <>
            <nav className={classes.navbar}>
                <ul>
                    <li onClick={(e) => { navigator(e) }}>Home</li>
                    <li onClick={(e) => { navigator(e) }}>Shop</li>
                    <li onClick={(e) => { navigator(e) }}>Donate</li>
                    <li onClick={(e) => { navigator(e) }}>Videos</li>
                </ul>
            </nav>

            <div className={classes.spacer}></div>

        </>
    )
}

export default Header