import { Request, Response } from 'express';
import { connection } from '../database/config/connection';
import crypto from 'crypto';
import { Usuario, UsuarioReqProps } from '../types/apiTypes';
import { updateUser } from '../utils/verifyDataRequest';

export default {

    async index(req: Request, res: Response) {
        const usuarios = await connection<Usuario>
            ('user')
            .select(
                'id',
                'name',
                'email',
                'celular',
                'avatarPath'
            );

        return res.json(usuarios)
    },
    async create(req: Request, res: Response) {
        const {
            name,
            celular,
            email,
            password
        }: UsuarioReqProps = req.body;

        const dataUser: Usuario = {
            id: Math.floor(Math.random()*997*2),
            name,
            celular,
            email,
            password,
            avatarPath: ''
        }

        try {
            await connection('user').insert(dataUser);

            return res.status(201).json({ status: "Usuário criado com sucesso" });
        } catch (error) {
            console.log(error)
            return res.status(201).json({
                status: "Erro ao criar usuário",
                message: error.message
            })
        }
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;

        const verifyAuth = await connection('user')
            .where('user.id', id)
            .andWhere('user.id', authorization);

        try {
            if (!verifyAuth[0]) {
                return res.status(403).json({
                    status: "Erro ao deletar usuário",
                    message: 'Operação não autorizada para este usuário'
                });
            } else {
                try {
                    await connection('user')
                        .where('user.id', id)
                        .andWhere('user.id', authorization)
                        .delete();

                    return res.json({ status: "Usuário deletado com sucesso" })
                } catch (error) {
                    return res.status(201).json({
                        status: "Erro ao deletar usuário",
                        message: error.message
                    });
                }
            }
        } catch (error) {
            return res.status(201).json({
                status: "Erro ao deletar usuário",
                message: error.message
            });
        }
    },
    async update(req: Request, res: Response) {
        const { authorization } = req.headers;

        const { name, email, celular }: UsuarioReqProps = req.body;

        try {
            const update = await updateUser(
                name,
                email,
                celular,
                authorization
                );
                    
            return res.status(update?.code).json({
                status: update.status,
                data: update.Data
            })
        } catch (error) {
            return res.json(error);
        };
    }, 
}