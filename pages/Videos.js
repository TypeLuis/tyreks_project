import axios from 'axios'
import React from 'react'
import classes from '../styles/Videos.module.scss'
import { useState } from 'react'
import VideoContainer from '../components/VideoContainer'

const Videos = (props) => {

    console.log(props.result)

    const channelName = props.result ? props.result[0].snippet.videoOwnerChannelTitle : ''
    return (
        <div className={classes.main}>
            <h1>{channelName}</h1>
            <div className={classes.grid}>

                {props.result && props.result.map((item, i) => <VideoContainer info={item} />)}

            </div>

        </div>
    )
}


export const getStaticProps = async () => {

    // Function that gets Info from youtube videos through the google api. Adds Promises to an array to then be resolved later, showing the results.
    const YouTube_Video_Info = async () => {

        const links = [
            'https://www.youtube.com/watch?v=dmtK7RiIz1A',
            'https://www.youtube.com/watch?v=a5elivsTUKg',
            'https://www.youtube.com/watch?v=5svxuS3L9_s',
            'https://www.youtube.com/watch?v=wdOra_ckb-s',
            'https://www.youtube.com/watch?v=3Gz-VEdWnx0',
            'https://www.youtube.com/watch?v=LIDABfQvkkc'
        ]

        const promises = []

        links.map((item, i) => {
            const id = item.split('=')[1]

            // https://stackoverflow.com/questions/68094164/add-property-to-array-of-obejct-with-async-function
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&fields=items(id%2Csnippet)&key=${process.env.YTAPI}`)

                    resolve(response.data.items[0])

                } catch (error) {
                    reject(error)
                }
            })

            promises.push(promise);

        })

        const result = await Promise.all(promises).then(r => r).catch(error => { throw error })

        return result
    }

    // Function that utilizes 3 response from Google's YouTube API to get video uploads with all info needed from YouTube Channel
    const Get_Uploads_From_YT_Channel = async () => {
        try {

            // https://stackoverflow.com/questions/18953499/youtube-api-to-fetch-all-videos-on-a-channel
            // https://stackoverflow.com/questions/14366648/how-can-i-get-a-channel-id-from-youtube
            const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UC-Y-ZFvEtINXQADTc3_3C9Q&key=${process.env.YTAPI}&part=snippet,contentDetails,statistics`)

            const playListId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads

            const playListResponse = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playListId}&key=${process.env.YTAPI}`)

            const playListItems = playListResponse.data.items

            // https://stackoverflow.com/questions/63217617/how-to-get-views-and-comment-count-when-using-youtube-data-api-v3-playlistitems
            let videoIdList = ''
            playListItems.map((item, i) => {
                const videoId = item.contentDetails.videoId
                playListItems.length - 1 === i ? videoIdList += `${videoId}` : videoIdList += `${videoId},`
            })

            const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIdList}&key=${process.env.YTAPI}`)

            const results = videoResponse.data.items

            return results
        } catch (error) {
            console.log(error)
        }
    }

    return {
        'props': {
            'test': await YouTube_Video_Info(),
            'result': await Get_Uploads_From_YT_Channel()
        },
    }
}

export default Videos