import React from 'react'
import classes from '../styles/Header.module.scss'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Image from 'next/image'
import logo from '../Assets/ZKDT_Logo.svg'

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
            </nav>

            <div className={classes.spacer}></div>

        </>
    )
}

export default Header