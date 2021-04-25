export type EpisodeProps = {
    id: string
    title: string
    members: string
    published_at: string
    thumbnail: string
    description: string
    file: {
      url: string
      type?: string
      duration: number | string
      durationSec: number | string
    }
  }
  
export type EpisodesProps = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description?: string
  file: {
    url: string
    durationSec:number | string
    duration: number | string
  }
}

export interface HomeProps {
  allEpisodes: EpisodesProps[]
  latestEpisodes: EpisodesProps[]
}

export interface slugEpisodeProps{
  episode:EpisodeProps
}

export type dataEpisodeProps = {
  data:{id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: {
    url: string
    type?: string
    duration: number | string
  }}
}