import { Request, Response } from 'express';
import { connection } from '../database/config/connection';
import * as mm from 'music-metadata';
import got from 'got'
import crypto from 'crypto'
import format from 'date-fns/format'
import { EpisodeDB, EpisodeFormated } from '../types/apiTypes';
import env from 'dotenv'

env.config()

export default {

    async index(req: Request, res: Response) {
        try {
            const episodes = await connection<EpisodeDB>('episodes')
                .innerJoin('file', 'file.idEpisode', '=', 'episodes.id')
                .select('*')
                .orderBy('published_at', 'desc');

            const episodesFormated = episodes.map((ep: EpisodeDB) => {
                const data: EpisodeFormated = {
                    id: ep.id,
                    title: ep.title,
                    members: ep.members,
                    published_at: ep.published_at,
                    thumbnail: ep.thumbnail,
                    description: ep.description,
                    file: {
                        url: ep.url,
                        type: ep.type,
                        duration: ep.duration,
                        idFile: ep.idFile,
                    },
                    idUsuario: ep.idUsuario,
                }
                return data;
            })

            return res.json(episodesFormated);
        } catch (error) {
            return res.json(error);
        }
    },
    async create(req: Request, res: Response) {
        const { authorization } = req.headers;
        const {
            title,
            members,
            thumbnail = 'https://storage.googleapis.com/golden-wind/nextlevelweek/05-podcastr/opensource.jpg',
            description
        } = req.body;

        const {//@ts-expect-error
            key: filename,//@ts-expect-error
            location: url = `http://localhost:4444/files/${filename}`,
            mimetype: type,
            size
        } = req.file;

        let duration

        duration = await getDurationAudio(filename, url, type, size)

        const episodeProps = {
            id: crypto.randomBytes(3).toString('hex'),
            title,
            members,
            published_at: format(Date.now(), 'yyyy-MM-dd kk:mm:ss'),
            thumbnail,
            description,
            idUsuario: Number(authorization)!!
        }

        const episodeFileProps = {
            idFile: Math.floor(Math.random() * 997 * 2),
            url,
            type,
            duration,
            idEpisode: episodeProps.id,
        }

        try {
            //console.dir({ episodeFileProps }, { depth: null })
            await connection('episodes').insert(episodeProps);

            try {
                await connection('file').insert(episodeFileProps);
            } catch (error) {
                await connection('episodes').where('id', episodeProps.id).delete();
                return res.json({
                    status: 'Episódio não cadastrado',
                    motive: 'Não foi possível gravar informações do audio no DB',
                    erro: error.message
                })
            };

            return res.json({
                status: 'Episódio cadastrado com sucesso'
            })
        } catch (error) {
            return res.json({
                status: 'Episódio não cadastrado',
                motive: 'Não foi possível gravar informações do episódio no DB',
                erro: error.message
            })
        }
    },
    async delete(req: Request, res: Response) {
        const { authorization } = req.headers;
        const { id } = req.params;

        try {
            await connection('file')
                .where('idEpisode', id)
                .delete();

            await connection('episodes')
                .where('id', id)
                .where('idUsuario', authorization)
                .del();

            return res.json({
                status: 'Episódio deletado com sucesso',
            })
        } catch (error) {
            return res.json(error.message)
        }
    },
    async one(req: Request, res: Response) {
        const { id } = req.params;
        const episodes = await connection<EpisodeDB>('episodes')
            .innerJoin('file', 'file.idEpisode', '=', 'episodes.id')
            .where('episodes.id', id)
            .select('*').first();

        const episodeFormated = {
            id: episodes.id,
            title: episodes.title,
            members: episodes.members,
            published_at: episodes.published_at,
            thumbnail: episodes.thumbnail,
            description: episodes.description,
            file: {
                url: episodes.url,
                type: episodes.type,
                duration: episodes.duration,
                idFile: episodes.idFile,
            },
            idUsuario: episodes.idUsuario,
        }
        return res.json(episodeFormated)
    },
}

async function getDurationAudio(filename: string, url: string, mimeType: string, size: number) {
    try {
        const stream = await got.stream(url);
        const { format } = await mm.parseStream(stream, { mimeType, size });

        console.dir(format.duration, { depth: null })
        return Math.floor(Number(format.duration));
    } catch (error) {
        console.log(error);
    }
};