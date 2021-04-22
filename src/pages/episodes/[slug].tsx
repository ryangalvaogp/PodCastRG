import { parseISO, format as forma } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../../services/api'
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'
import { slugEpisodeProps, EpisodeProps, dataEpisodeProps } from '../../types/appTypes'
import styles from '../../styles/pages/slug.module.scss'

export default function Episode({ episode }: slugEpisodeProps) {
    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                    <button type='button'>
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit={'cover'}
                />
                <button type='button'>
                    <img src="/play.svg" alt="Tocar Episódio" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.published_at}</span>
                <span>{episode.file.duration}</span>
            </header>
            <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: episode.description }}
            />
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data }: dataEpisodeProps = await api.get(`/episodes/${slug}`);

    const episode: EpisodeProps = {
        id: data.id,
        title: data.title,
        members: data.members,
        description: data.description,
        thumbnail: data.thumbnail,
        published_at: forma(
            parseISO(data.published_at),
            'd MMM yy',
            { locale: ptBR }),
        file: {
            duration: convertDurationToTimeString(data.file.duration),
            url: data.file.url
        }
    };

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24
    }
}