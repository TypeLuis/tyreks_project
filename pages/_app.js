import Header from '../components/Header'
import '../styles/globals.scss'
import classes from '../styles/global.module.scss'
import { useRef, useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [height, setHeight] = useState()
  const pageRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const [pageInfo, setPageInfo] = useState()



  const checkHeight = () => {
    const rect = pageRef.current?.getClientRects()[0].height

    const refHeight = pageRef.current?.offsetHeight

    setHeight(refHeight)

  }

  const setInfo = () => {
    const info = {
      'leftRef': leftRef,
      'rightRef': rightRef,
      'pageRef': pageRef,
      'heightRect': pageRef.current?.getClientRects()[0].height,
      'changed': false
    }

    setPageInfo(info)
  }

  useEffect(() => {
    checkHeight()
    setInfo()
  }, [pageRef.current?.offsetHeight])
  return (
    <>
      <Header />
      <div className={classes.Page_Content}>

        <div ref={leftRef} style={{ "height": height }} className={classes.left}>

        </div>

        <div ref={pageRef} className={classes.middle}>

          <Component pageInfo={pageInfo} {...pageProps} />
        </div>

        <div ref={rightRef} style={{ "height": height }} className={classes.right}>
          {/* <h1>klk mani</h1> */}
        </div>

      </div>

    </>
  )
}

export default MyApp
