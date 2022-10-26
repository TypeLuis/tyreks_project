import axios from 'axios'
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

    const test = async (id) => {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items(id%2Csnippet)&key=${process.env.YTAPI}`)

        return response.data.items[0]
    }
    return (
        <div className={classes.main}>

            <div className={classes.grid}>

                {links.map((item, i) => {
                    const url = item.replace("watch?v=", "embed/")
                    const id = item.split('=')[1]
                    // console.log(id)
                    const response = test(id)


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