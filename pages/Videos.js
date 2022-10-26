import React from 'react'
import classes from '../styles/Videos.module.scss'

const Videos = () => {
    const links = [
        'https://www.youtube.com/watch?v=dmtK7RiIz1A',
        'https://www.youtube.com/watch?v=a5elivsTUKg',
        'https://www.youtube.com/watch?v=5svxuS3L9_s',
        'https://www.youtube.com/watch?v=wdOra_ckb-s',
        'https://www.youtube.com/watch?v=3Gz-VEdWnx0',
        'https://www.youtube.com/watch?v=LIDABfQvkkc'
    ]
    console.log(process.env.YTAPI)
    return (
        <div className={classes.main}>

            <div className={classes.grid}>

                {links.map((item, i) => {
                    const url = item.replace("watch?v=", "embed/")

                    return (
                        <div className={classes['Iframe_Container']}>
                            <iframe src={url} allowfullscreen title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default Videos