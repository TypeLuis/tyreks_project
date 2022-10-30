import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import classes from '../styles/SideImages.module.scss'

import Beige from '../Assets/Death_Trap_Beige.jpeg'
import Colored from '../Assets/Death_Trap_Colored.png'
import Dark_Green from '../Assets/Death_Trap_Dark_Green.jpeg'
import Purple from '../Assets/Death_Trap_Purple.jpeg'
import Red from '../Assets/Death_Trap_Red.jpeg'
// import Blue from '../Assets/Death_Trap_Blue.jpeg'

const Side_Images = (props) => {

    const [height, setHeight] = useState()

    const imgs = [
        Colored,
        Dark_Green,
        Purple,
        Beige,
        Red,
    ]

    const imgHeight = props.height / imgs.length

    useEffect(() => {
        setHeight(imgHeight)
        console.log(props.height, imgHeight, imgs.length)
        console.log(height)
    }, [props?.height])
    return (
        <div className={classes.main}>
            {imgs.map((item, i) => {
                return (
                    <>
                        <Image height={height} src={item} />
                    </>
                )
            })}

        </div>
    )
}

export default Side_Images