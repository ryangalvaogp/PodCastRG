import Head from 'next/head'
import Header from '../components/Header'

type episodesProps = {
  id: string
  title: string
  members: string
  published_at: string
  thumbnail: string
  description: string
  file: {
    url: string
    type: string
    duration: number
  }

}
interface HomeProps{
  episodes:episodesProps[]
}

export default function Home({episodes}:HomeProps) {
  return (
    <>
      <h1>Página Principal</h1>
      <span>{episodes[0].title}</span>
    </>
  )
}


export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes  ')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate:60*60*8,
  }
}
