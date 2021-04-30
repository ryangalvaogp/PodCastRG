import dotenv from 'dotenv';
import knex from 'knex';
import Config from '../../../knexfile';

dotenv.config()

const config = Config.development

export const connection = knex(config);

