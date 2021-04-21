import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import Header from '../components/Header'
import Player from '../components/Player'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <Player />
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
    </div>
  )
}

export default MyApp
