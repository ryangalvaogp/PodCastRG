import { usePlayer } from '../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

export default function Player() {
    const {
        currentEpisodeIndex,
        episodeList,
        isPlaying,
        isLooping,
        isShuffling,
        audioRef,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        tooglePlay,
        toogleLooping,
        toogleShuffle,
        setPlayingState,
        clearPlayerState
    } = usePlayer();

    const episode = episodeList[currentEpisodeIndex];
    const [progress, setProgress] = useState(0);

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        })
    }

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded() {
        if (!hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    }

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
                    <span>
                        {episode
                            ? convertDurationToTimeString(progress) : '00:00:00'}
                    </span>
                    <div className={styles.slider}>
                        {!episode
                            ? <div className={styles.emptySlider} />
                            : <Slider
                                max={Number(episode.file.durationSec)}
                                value={progress}
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
                                onChange={handleSeek}
                            />
                        }
                    </div>
                    <span>
                        {episode
                            ? episode?.file.duration
                            : '00:00:00'}
                    </span>
                </div>
                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.file.url}
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedData={() => setupProgressListener()}
                        autoPlay
                        onEnded={() => handleEpisodeEnded()}
                    />
                )}
                <div className={styles.buttons}>
                    <button
                        onClick={() => toogleShuffle()}
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        className={isShuffling
                            ? styles.isActive
                            : ''}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button
                        onClick={() => playPrevious()}
                        type="button"
                        disabled={!episode || !hasPrevious}
                    >
                        <img src="/play-previous.svg" alt="Tocar Anterior" />
                    </button>
                    <button
                        onClick={() => tooglePlay()}
                        type="button"
                        disabled={!episode}
                        className={styles.playButton}
                    >
                        {isPlaying
                            ? <img src="/pause.svg" alt="Tocar" />
                            : <img src="/play.svg" alt="Tocar" />}
                    </button>
                    <button
                        onClick={() => playNext()}
                        type="button"
                        disabled={!episode || hasNext}
                    >
                        <img
                            src="/play-next.svg"
                            alt="Tocar Próxima"
                        />
                    </button>
                    <button
                        onClick={() => toogleLooping()}
                        type="button"
                        disabled={!episode || episodeList.length === 1}
                        className={isLooping ? styles.isActive : ''}
                    >
                        <img
                            src="/repeat.svg"
                            alt="Repetir"
                        />
                    </button>
                </div>
            </footer>
        </div>
    )
}