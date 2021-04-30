import { connection } from "../database/config/connection";
import { UpdateUserProps } from "../types/apiTypes";

export async function updateUser(
    name: string,
    email: string,
    celular: string,//@ts-ignore
    auth: string | undefined): Promise<UpdateUserProps> {

    if (name && !email && !celular) {
        await connection('user')
            .where('id', auth)
            .update('name', name);
        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: { name },
        }
    };

    if (!name && email && !celular) {
        await connection('user')
            .where('id', auth)
            .update('email', email);

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: { email },
        }
    };

    if (name && email && !celular) {
        await connection('user')
            .where('id', auth)
            .update({
                name,
                email
            })

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: {
                name,
                email,
            },
        }
    };

    if (name && email && celular) {

        await connection('user')
            .where('id', auth)
            .update({
                name,
                email,
                celular
            });

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: {
                name,
                email,
                celular
            },
        }
    };

    if (name && !email && celular) {

        await connection('user')
            .where('id', auth)
            .update({
                name,
                celular
            });

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: {
                name,
                celular
            },
        }
    };

    if (!name && email && celular) {

        await connection('user')
            .where('id', auth)
            .update({
                email,
                celular
            });

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: {
                email,
                celular
            },
        }
    };

    if (!name && !email && celular) {

        await connection('user')
            .where('id', auth)
            .update({celular});

        return {
            code: 200,
            status: "Informações Atualizadas",
            Data: {
                celular
            },
        }
    };
};