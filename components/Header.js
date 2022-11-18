import React, { useCallback } from 'react'
import classes from '../styles/Header.module.scss'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import logo from '../Assets/ZKDT_Logo.svg'
import cart from '../Assets/icon-cart.svg'
import { jwtVerify } from 'jose'
import { AppContext } from '../context'

const Header = () => {
    const { cartState } = useContext(AppContext)
    const [cartLength, setCartLength] = cartState



    const router = useRouter()

    const navigator = (e) => {
        // console.log(e)
        e.target.textContent === 'Home' ? router.push(`/`) : router.push(`/${e.target.textContent}`)
        // router.push(`/${e.target.textContent}`)
    }
    return (
        <>
            <nav className={classes.navbar}>
                <span className={classes.home}>
                    {/* <Image src={logo} /> */}
                    <Image onClick={(e) => { navigator(e) }} src={logo} height={70} width={100} />
                    {/* Home */}
                </span>
                <ul>
                    <li onClick={(e) => { navigator(e) }}>Shop</li>
                    <li onClick={(e) => { navigator(e) }}>Donate</li>
                    <li onClick={(e) => { navigator(e) }}>Videos</li>
                </ul>

                <span data-text={cartLength} className={`${classes.cart} ${cartLength > 0 && classes.items}`}>

                    <Image src={cart} height={40} width={40}></Image>
                </span>
            </nav>

            {/* <div className={classes.spacer}></div> */}

        </>
    )
}

export default Header