import express from 'express';
import multer from 'multer';
import path from 'path'
import upload from './config/upload';
import uploadLocal from './config/uploadLocal';
import episodesControllers from './controllers/episodesControllers';
import sessionControllers from './controllers/sessionControllers';
import usuariosControllers from './controllers/usuariosControllers';

export const Route = express.Router();
const up = multer(upload);

Route.post('/session/login', sessionControllers.create);

Route.get('/user', usuariosControllers.index);
Route.post('/user', usuariosControllers.create);
Route.delete('/user/:id', usuariosControllers.delete);
Route.put('/user/', usuariosControllers.update);

Route.get('/ep', episodesControllers.index);
Route.get('/ep/:id', episodesControllers.one);
Route.post('/ep', up.single('audio'), episodesControllers.create);
Route.delete('/ep/:id', episodesControllers.delete);


Route.use('/files',
    express.static(
        path.resolve(__dirname, '..', 'episodes')
    )
)