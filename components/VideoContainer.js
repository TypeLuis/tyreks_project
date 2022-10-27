import React from 'react'
import classes from '../styles/Videos.module.scss'
import { useState } from 'react'

const VideoContainer = (props) => {
    const [clicked, setClicked] = useState(false)
    const checkclicked = clicked ? 'clicked' : 'not_clicked'
    const info = props.info
    const videoId = info.id
    const url = `https://www.youtube.com/embed/${videoId}`
    const title = info.snippet.title
    const description = info.snippet.description
    return (
        <div className={classes['Iframe_Container']}>
            <h3>{title}</h3>
            <iframe src={url} allowFullScreen title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            <div className={`${classes['more-info']} ${classes[checkclicked]}`}>
                <p>
                    description: {description}
                </p>
            </div>
            <h4>More Info ↓</h4>
        </div >
    )
}

export default VideoContainer