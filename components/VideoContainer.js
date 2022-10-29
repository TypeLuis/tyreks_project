import React from 'react'
import classes from '../styles/Videos.module.scss'
import { useState, useRef, useEffect } from 'react'

const VideoContainer = (props) => {
    const [clicked, setClicked] = useState(false)
    const checkclicked = clicked ? 'clicked' : 'not_clicked'

    const infoRef = useRef(null)
    const [infoHeight, setInfoHeight] = useState(infoRef);

    // function checks if device is touchscreen
    const isTouchDevice = () => {
        return window.ontouchstart !== undefined;
    }

    // subtracts margin height from entire height to get height of the element (32 is the margin height). this is done to achive hide and show functions
    const handleInfoClick = () => {
        const scrollHeight = infoRef.current?.scrollHeight
        clicked ? isTouchDevice() ? setInfoHeight(scrollHeight) : setInfoHeight(scrollHeight - 32) : setInfoHeight(0)
    }

    useEffect(() => {
        handleInfoClick()
    }, [clicked])


    const handleMouseOver = () => {
        const iframe = infoRef.current?.parentNode
        iframe.style.border = '1px solid green'

        if (!isTouchDevice()) {

            if (clicked) {
                setInfoHeight(infoHeight - 50)
            }
            else if (!clicked) {
                setInfoHeight(50)

            }
        }
    }

    const handleMouseOut = () => {
        const iframe = infoRef.current?.parentNode
        iframe.style.border = '1px solid #eaeaea'

        if (!isTouchDevice()) {
            if (clicked) {
                setInfoHeight(infoHeight + 50)
            }
            else if (!clicked) {
                // console.log(isTouchDevice())
                setInfoHeight(0)
            }
        }
    }

    const index = props.index
    const info = props.info
    const videoId = info.id
    const url = `https://www.youtube.com/embed/${videoId}`
    const title = info.snippet.title
    const description = info.snippet.description
    const statistics = info.statistics
    const dateInfo = info.snippet.publishedAt.split('T')[0].split('-')
    const date = `${dateInfo[1]}/${dateInfo[2]}/${dateInfo[0]}`

    return (
        <div className={`${classes['Iframe_Container']} ${classes[checkclicked]}`}>

            <h3>{title}</h3>

            <iframe src={url} allowFullScreen title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>

            <div ref={infoRef} style={{ "height": infoHeight }} className={`${classes['more-info']}`}>
                <p>
                    description: {description}
                </p>
                <div>
                    <span>Released: {date}</span>
                    <span>Views: {statistics.viewCount}</span>
                    <span>Likes: {statistics.likeCount}</span>
                </div>

            </div>

            <h4 onMouseOver={() => { handleMouseOver() }} onMouseOut={() => { handleMouseOut() }} onClick={() => { setClicked(!clicked); }}>
                {clicked ?
                    <>Less Info ↑</>
                    :
                    <>More Info ↓</>
                }
            </h4>

        </div >
    )
}

export default VideoContainer