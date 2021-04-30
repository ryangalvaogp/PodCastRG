import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';
import { SessionContextData, usuarioLoggedData } from '../types/SessionContext';


export const SessionContext = createContext({} as SessionContextData)
export function SessionContextProvider({ children }) { //@ts-expect-error
    const [usuarioLoggedData, setUsuarioLoggedData] = useState<usuarioLoggedData>({});
    
    async function Login(email: string, password: string) {
        try {
            await api.post('session/login', {
                email,
                password
            }).then(res=>{
                setUsuarioLoggedData(res.data);
            })

            return {
                isLogin:usuarioLoggedData?true:false,
                message:`${usuarioLoggedData.name} foi logado com sucesso`
            }
        } catch (error) {
            return {
                isLogin:false,
                message:`Erro ao logar`
            }
        }
    }

    async function Logout (){
        //@ts-expect-error
        setUsuarioLoggedData({})
    }

    return (
        <SessionContext.Provider value={
            {
                usuarioLoggedData,
                Login
            }
        }>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
}