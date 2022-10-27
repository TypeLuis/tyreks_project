import React from 'react'
import classes from '../styles/Videos.module.scss'
import { useState, useRef, useEffect } from 'react'

const VideoContainer = (props) => {
    const [clicked, setClicked] = useState(false)
    const checkclicked = clicked ? 'clicked' : 'not_clicked'

    const [infoHeight, setInfoHeight] = useState(null);
    const infoRef = useRef(null)

    // changes More-info div height depending on click
    useEffect(() => {
        clicked ? setInfoHeight(infoRef.current?.scrollHeight) : setInfoHeight(0)
    }, [clicked])

    const info = props.info
    const videoId = info.id
    const url = `https://www.youtube.com/embed/${videoId}`
    const title = info.snippet.title
    const description = info.snippet.description
    return (
        <div className={`${classes['Iframe_Container']} ${classes[checkclicked]}`}>
            <h3>{title}</h3>
            <iframe src={url} allowFullScreen title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
            <div className={`${classes['info_container']}`}>
                <h4 onClick={() => { setClicked(!clicked); console.log(infoRef); }}>
                    {clicked ?
                        <>Less Info ↑</>
                        :
                        <>More Info ↓</>
                    }
                </h4>

                <div ref={infoRef} style={{ "height": infoHeight }} className={`${classes['more-info']}`}>
                    <p>
                        description: {description}
                    </p>
                </div>
            </div>
        </div >
    )
}

export default VideoContainer