import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import Header from '../components/Header'
import Player from '../components/Player'
import { PlayerContextProvider } from '../contexts/PlayerContext'
import { SessionContextProvider } from '../contexts/sessionContext'

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider>
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
    </SessionContextProvider>
  )
}

export default MyApp
