import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';

export default function Player() {
    const {
        currentEpisodeIndex,
        episodeList,
        isPlaying,
        audioRef,
        tooglePlay,
        setPlayingState
    } = useContext(PlayerContext);

    const episode = episodeList[currentEpisodeIndex];
   

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando Agora" />
                {episode && <strong>Tocando agora</strong>}

            </header>

            {!episode ? <div className={styles.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div> :

                <div className={styles.currentEpisode}>
                    <Image
                        width={592}
                        height={592}
                        src={episode.thumbnail}
                        objectFit='cover'
                    />
                    <strong>{episode.title} </strong>
                    <span>{episode.members} </span>
                </div>
            }

            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {!episode ? <div className={styles.emptySlider} /> :
                            <Slider
                                trackStyle={{
                                    background: '#00853c'
                                }}
                                railStyle={{
                                    background: '#bb1e1e'
                                }}
                                handleStyle={{
                                    background: '#00853c',
                                    borderWidth: 4,
                                    borderColor: '#5a0000',
                                }}
                            />
                        }
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.file.url}
                        onPlay={()=>setPlayingState(true)}
                        onPause={()=>setPlayingState(false)}
                        autoPlay
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-previous.svg" alt="Tocar Anterior" />
                    </button>
                    <button 
                        onClick={() => tooglePlay()} 
                        type="button" 
                        disabled={!episode} 
                        className={styles.playButton}
                        >
                        {isPlaying ?
                            <img src="/pause.svg" alt="Tocar"/> :
                            <img src="/play.svg" alt="Tocar"/>}
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar Próxima" />
                    </button>
                    <button type="button" disabled={!episode}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}
