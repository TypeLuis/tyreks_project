import Header from '../components/Header'
import '../styles/globals.css'
import classes from '../styles/global.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className={classes.Page_Content}>

        <div>

        </div>
        <Component {...pageProps} />
        <div>

        </div>

      </div>

    </>
  )
}

export default MyApp
