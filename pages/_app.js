import Header from '../components/Header'
import '../styles/globals.scss'
import classes from '../styles/global.module.scss'
import { useRef, useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [height, setHeight] = useState()
  const pageRef = useRef(null)

  const [pageInfo, setPageInfo] = useState()



  const checkHeight = () => {
    // const rect = pageRef.current?.getClientRects()[0].height
    const refHeight = pageRef.current?.childNodes[0].offsetHeight
    setHeight(refHeight)

  }

  const resize = () => {
    checkHeight()
  }

  useEffect(() => {
    window.onresize = resize
  }, [])



  return (
    <>
      <Header />
      <div className={classes.Page_Content}>

        <div style={{ "height": height }} className={classes.left}>

        </div>

        <div ref={pageRef} className={classes.middle}>

          <Component setPageInfo={setPageInfo} pageInfo={pageInfo} {...pageProps} />
        </div>

        <div style={{ "height": height }} className={classes.right}>
        </div>

      </div>

    </>
  )
}

export default MyApp
