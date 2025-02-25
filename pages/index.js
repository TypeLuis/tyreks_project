import Head from 'next/head'
import Image from 'next/image'
import classes from '../styles/Home.module.scss'
import transparent_image from '../Assets/Fleece/Fleece transparent.png'
import TextDiv from '../components/TextDiv/TextDiv.js'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  return (
    <div className={classes.container}>


      <Head>
        <title>Zombie Killer Death Trap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <>Home Page</> */}



      <div className={classes.Flyer}>


        <img src='https://i.imgur.com/mmhYlyt.jpg' alt='Flyer' />
        <img src='https://i.imgur.com/lZhlg02.jpg' alt='Flyer2' />
        <img src='https://i.imgur.com/PQiry0k.jpeg' alt='Flyer3' />
      </div>


      {/* <Image src={transparent_image} /> */}


      {/* <div className={classes.banner}>

        <div className={classes.content}>
          <h1>Zombie Killer Death Trap</h1>
          <p onClick={() => { router.push('Shop') }} className={classes.button}>Shop for more</p>
        </div>


        <div className={classes.image}>

          <img src='https://i.imgur.com/B5EM5a9.png' />
        </div>
      </div> */}

      {/* <TextDiv

        title={'test title'}

        textOne={{
          title: 'Test Title',
          summary: `I am not sure if App Engine, from Google Cloud, is parsing the request body before I can even touch it.
My only reference point is that if I console.log out the complete request, the body part is always already parsed as a JSON, at least it seems like it.`
        }}

        textTwo={{
          title: 'Test Title',
          summary: `I am not sure if App Engine, from Google Cloud, is parsing the request body before I can even touch it.
My only reference point is that if I console.log out the complete request, the body part is always already parsed as a JSON, at least it seems like it.`
        }}

      /> */}


    </div>
  )
}
