import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_SOURCE === 'API_REST_FULL'
        ? process.env.BASE_URL_API_LOCAL
        : process.env.BASE_URL_API_PROD

})

