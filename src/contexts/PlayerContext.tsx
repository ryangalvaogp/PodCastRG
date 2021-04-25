import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Episode, PlayerContextData } from '../types/PlayerContext';

export const PlayerContext = createContext({} as PlayerContextData)
export function PlayerContextProvider({ children }) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    };

    function tooglePlay() {
        setIsPlaying(!isPlaying);
    };

    function toogleLooping() {
        setIsLooping(!isLooping);
    };

    function toogleShuffle() {
        setIsShuffling(!isShuffling);
    }

    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) >= episodeList.length;

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);

            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (!hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    }

    function playPrevious() {
        const nextEpisodeIndex = currentEpisodeIndex - 1;

        if (hasPrevious) {
            setCurrentEpisodeIndex(nextEpisodeIndex);
        }
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state);
    }

    function clearPlayerState(){
        console.log({episodeList, currentEpisodeIndex})
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
        console.log({episodeList, currentEpisodeIndex})
    }

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <PlayerContext.Provider value={
            {
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                isLooping,
                isShuffling,
                audioRef,
                hasNext,
                hasPrevious,
                play,
                playNext,
                playPrevious,
                playList,
                tooglePlay,
                toogleLooping,
                toogleShuffle,
                setPlayingState,
                clearPlayerState
            }
        }>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    return useContext(PlayerContext);
}