import axios from 'axios'
import React from 'react'
import classes from '../styles/Videos.module.scss'

const Videos = (props) => {

    console.log(props.result)
    const channelName = props.result ? props.result[0].snippet.videoOwnerChannelTitle : ''
    return (
        <div className={classes.main}>
            <h1>{channelName}</h1>
            <div className={classes.grid}>

                {props.result && props.result.map((item, i) => {
                    const videoId = item.contentDetails.videoId
                    const url = `https://www.youtube.com/embed/${videoId}`
                    const title = item.snippet.title
                    const description = item.snippet.description
                    // console.log(item)
                    return (
                        <div className={classes['Iframe_Container']}>
                            {/* <h3>{item}</h3> */}
                            <iframe src={url} allowFullScreen title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                        </div>
                    )
                })}

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


    const Get_Uploads_From_YT_Channel = async () => {
        try {

            // https://stackoverflow.com/questions/18953499/youtube-api-to-fetch-all-videos-on-a-channel
            // https://stackoverflow.com/questions/14366648/how-can-i-get-a-channel-id-from-youtube
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=UC-Y-ZFvEtINXQADTc3_3C9Q&key=${process.env.YTAPI}&part=snippet,contentDetails,statistics`)

            const uploadsID = response.data.items[0].contentDetails.relatedPlaylists.uploads

            const secondResponse = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${uploadsID}&key=${process.env.YTAPI}`)

            const results = secondResponse.data.items

            return results
        } catch (error) {
            console.log(error)
        }
    }

    // const result = await YouTube_Video_Info()

    return {
        'props': {
            'test': await YouTube_Video_Info(),
            'result': await Get_Uploads_From_YT_Channel()
        },
    }
}

export default Videos