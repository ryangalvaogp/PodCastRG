import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link'
import { api } from '../services/api';
import { format as forma, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import convertDurationToTimeString from '../utils/convertDurationToTimeString';
import styles from '../styles/pages/home.module.scss';
import {HomeProps, EpisodesProps} from '../types/appTypes'

export default function Home({
  allEpisodes,
  latestEpisodes
}: HomeProps) {
  const {
    currentEpisodeIndex, 
    episodeList, 
    play,
  } = useContext(PlayerContext);

  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>
          {latestEpisodes.map(ep => (
            <li key={ep.id}>
              <Image
                objectFit='cover'
                width={192}
                height={192}
                src={ep.thumbnail}
                alt={ep.title}
              />
              <div className={styles.episodesDetails}>
                <a href="#">{ep.title}</a>
                <p>{ep.members}</p>
                <span>{ep.published_at}</span>
                <span>{ep.file.duration}</span>
              </div>
              <button type='button'>
                <img 
                  src="/play-green.svg" 
                  alt="Tocar Episódio" 
                  onClick={e=> play(ep)}
                  />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>Todos Episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <th></th>
            <th>Podcast</th>
            <th>Integrantes</th>
            <th>Data</th>
            <th>Duração</th>
            <th></th>
          </thead>
          <tbody>
            {allEpisodes.map(ep => (
              <tr key={ep.id}>
                <td style={{width:72}}>
                  <Image
                    width={120}
                    height={120}
                    src={ep.thumbnail}
                    alt={ep.title}
                    objectFit='cover'
                  />
                </td>
                <td>
                  <Link href={`episodes/${ep.id}`}>
                    <a>{ep.title}</a>
                    </Link>
                </td>
                <td>{ep.members}</td>
                <td style={{width:100}}>{ep.published_at}</td>
                <td>{ep.file.duration}</td>
                <td>
                  <button type='button'>
                    <img src="/play-green.svg" alt="Tocar Episódio" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  });

  const episodes = data.map((ep: EpisodesProps) => {
    const format: EpisodesProps = {
      id: ep.id,
      title: ep.title,
      members: ep.members,
      thumbnail: ep.thumbnail,
      published_at: forma(parseISO(ep.published_at), 'd MMM yy', { locale: ptBR }),
      file: {
        duration: convertDurationToTimeString(ep.file.duration),
        url: ep.file.url
      }
    };

    return format;
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8,
  };
};