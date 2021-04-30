export interface SessionContextData {
    usuarioLoggedData:usuarioLoggedData

    Login: (email: string, password: string) => Promise<Login>
}

export interface Login {
    isLogin: boolean,
    message: string
}

export type usuarioLoggedData = {
    id: number
    name: string
    email: string
    celular: string
    avatarPath: string
}