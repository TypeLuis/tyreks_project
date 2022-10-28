import Header from '../components/Header'
import '../styles/globals.css'
import classes from '../styles/global.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className={classes.Page_Content}>

        <div className={classes.Left}>

        </div>

        <div className={classes.middle}>

          <Component {...pageProps} />
        </div>

        <div className={classes.right}>

        </div>

      </div>

    </>
  )
}

export default MyApp
