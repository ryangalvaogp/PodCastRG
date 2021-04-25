import { MutableRefObject } from "react"

export type Episode = {
  title: string
  members: string
  published_at: string
  thumbnail: string
  file: {
    url: string
    duration: number | string
    durationSec: number | string
  }
}

export type PlayerContextData = {
  episodeList: Episode[]
  currentEpisodeIndex: number
  isPlaying: boolean
  isLooping: boolean
  isShuffling: boolean
  audioRef: MutableRefObject<HTMLAudioElement>
  hasNext: boolean
  hasPrevious: boolean
  play: (episode: Episode) => void
  playNext: () => void
  playPrevious: () => void
  playList: (list: Episode[], index: number) => void
  tooglePlay: () => void
  toogleLooping: () => void
  toogleShuffle: () => void
  setPlayingState: (state: boolean) => void
  clearPlayerState: ()=>void
}