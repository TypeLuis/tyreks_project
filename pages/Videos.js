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
    return (
        <div>

            <div className={classes.grid}>

                {links.map((item, i) => {
                    console.log(item)
                })}

            </div>

        </div>
    )
}

export default Videos