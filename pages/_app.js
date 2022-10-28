import Header from '../components/Header'
import '../styles/globals.scss'
import classes from '../styles/global.module.scss'
import { useRef, useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [height, setHeight] = useState()
  const pageRef = useRef(null)

  useEffect(() => {
    const refHeight = pageRef.current?.offsetHeight
    console.log(refHeight)

    setHeight(refHeight)
  })
  return (
    <>
      <Header />
      <div className={classes.Page_Content}>

        <div style={{ "height": height }} className={classes.left}>

        </div>

        <div ref={pageRef} className={classes.middle}>

          <Component {...pageProps} />
        </div>

        <div style={{ "height": height }} className={classes.right}>
          {/* <h1>klk mani</h1> */}
        </div>

      </div>

    </>
  )
}

export default MyApp
