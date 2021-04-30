import { usePlayer } from '../contexts/PlayerContext';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import Link from 'next/link'
import Head from 'next/head'
import { api } from '../services/api';
import { format as forma, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import convertDurationToTimeString from '../utils/convertDurationToTimeString';
import styles from '../styles/pages/home.module.scss';
import { HomeProps, EpisodesProps } from '../types/appTypes'
import Episode from './episodes/[slug]';
import { useSession } from '../contexts/sessionContext';

export default function Home({
  allEpisodes,
  latestEpisodes
}: HomeProps) {
  const {
    playList
  } = usePlayer();
 
  const episodeList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home | PodcastRG</title>
      </Head>

      <section className={styles.latestEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>
          {latestEpisodes.map((ep, index) => (
            <li key={ep.id}>
              <Image
                objectFit='cover'
                width={192}
                height={192}
                src={ep.thumbnail}
                alt={ep.title}
              />
              <div className={styles.episodesDetails}>
                <Link href={`episodes/${ep.id}`}>
                  <a>{ep.title}</a>
                </Link>
                <p>{ep.members}</p>
                <span>{ep.published_at}</span>
                <span>{ep.file.duration}</span>
              </div>
              <button type='button'>
                <img
                  src="/play-green.svg"
                  alt="Tocar Episódio"
                  onClick={e => playList(episodeList, index)}
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
            {allEpisodes.map((ep, index) => (
              <tr key={ep.id}>
                <td style={{ width: 72 }}>
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
                <td style={{ width: 100 }}>{ep.published_at}</td>
                <td>{ep.file.duration}</td>
                <td>
                  <button type='button' onClick={() => playList(episodeList, index + latestEpisodes.length)}>
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
  const { data } = await api.get('ep', {
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
        durationSec:ep.file.duration,
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