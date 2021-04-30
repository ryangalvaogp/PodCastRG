export type Usuario = {
    id: number
    name: string
    celular: string
    email: string
    password: string
    avatarPath: string
}

export type UsuarioReqProps = {
    name: string
    celular: string
    email: string
    password: string
}

export type UpdateUserProps = {
    code: number,
    status: string,
    Data: {
        name?: string,
        email?: string,
        celular?: string
    }
}

export type EpisodeDB = {
    id: string,
    title: string
    members: string
    published_at: string
    thumbnail: string
    description: string
    idUsuario: number
    idFile: number
    url: string
    type: string
    duration: number
    idEpisode: string

}

export type EpisodeFormated = {
    id: string,
    title: string
    members: string
    published_at: string
    thumbnail: string
    description: string
    idUsuario: number
    file: {
        idFile: number
        url: string
        type: string
        duration: number
    }

}