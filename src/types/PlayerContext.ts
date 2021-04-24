import { MutableRefObject } from "react"

export type Episode ={
    title: string
    members: string
    published_at: string
    thumbnail: string
    file: {
      url: string
      duration: number | string
    }
}

export type PlayerContextData = {
    episodeList:Episode[]
    currentEpisodeIndex:number
    isPlaying:boolean,
    audioRef:MutableRefObject<HTMLAudioElement>
    play: (episode:Episode)=>void
    tooglePlay: ()=>void
    setPlayingState(state: boolean): void
}