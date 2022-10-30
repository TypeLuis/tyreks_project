import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import classes from '../styles/SideImages.module.scss'

import Beige from '../Assets/Death_Trap_Beige.png'
import Colored from '../Assets/Death_Trap_Colored.png'
import Dark_Green from '../Assets/Death_Trap_Dark_Green.png'
import Purple from '../Assets/Death_Trap_Purple.png'
import Red from '../Assets/Death_Trap_Red.png'
import bg from '../Assets/Death_Trap_bg.png'

const Side_Images = (props) => {

    const [height, setHeight] = useState()

    const imgs = [
        Colored,
        Dark_Green,
        Purple,
        Beige,
        Red,
    ]


    useEffect(() => {
        const imgHeight = props?.height / imgs.length
        setHeight(imgHeight)
    }, [props?.height])
    return (
        <div className={classes.main}>
            {imgs.map((item, i) => {
                return (
                    <div style={{ "height": `${height}px` }} className={classes.images}>
                        <Image src={item} />
                    </div>
                )
            })}

        </div>
    )
}

export default Side_Images