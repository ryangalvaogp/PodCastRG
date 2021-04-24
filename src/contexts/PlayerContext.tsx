import { createContext, useEffect, useRef, useState } from 'react'
import { PlayerContextData } from '../types/PlayerContext';


export const PlayerContext = createContext({} as PlayerContextData )
export function PlayerContextProvider({ children }) {
    const [episodeList, setEpisodeList] = useState ([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState (0)
    const [isPlaying,setIsPlaying] = useState (false);
    
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(()=>{
        if (!audioRef.current){
            return;
        }
        if (isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    },[isPlaying])
    

    function play(episode){
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    }

    function tooglePlay(){
        setIsPlaying(!isPlaying);
    };
    function setPlayingState (state:boolean){
        setIsPlaying(state)
    }

    return (
        <PlayerContext.Provider value={
            {
                episodeList,
                currentEpisodeIndex,
                isPlaying,
                audioRef,
                play,
                tooglePlay,
                setPlayingState
            }
        }>
            {children}
        </PlayerContext.Provider>
    );
};