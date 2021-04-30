import { Request, Response } from 'express';
import { connection } from '../database/config/connection';
import { Usuario } from '../types/apiTypes';

export default {

    async index(req: Request, res: Response) {

    },
    async create(req: Request, res: Response) {
        const { email, password } = req.body;

        const userLogin = await connection<Usuario>('user')
            .where({ email, password })
            .select(
                'id',
                'name',
                'email',
                'celular',
                'avatarPath'
            ).first();

        return res.json(userLogin);
    },
    async delete(req: Request, res: Response) {

    },
}