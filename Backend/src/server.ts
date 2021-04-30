import express from 'express';
import {Route} from './routes'
const app = express();
app.use(express.json());
app.use(Route);

app.listen(4444);