import express from 'express';
import cors from "cors";
import { appConfig } from './Utils/appConfig';
import authController from './Controllers/auth-controller';
import { catchAll } from './Middleware/catch-all';
import vacationsController from './Controllers/vacations-controller';
import imagesController from './Controllers/images-controller';
import path from 'path';

const server = express();
server.use(express.json());
server.use(cors());
server.use('/static', express.static(path.join(__dirname, 'Assets')));

server.use('/api', authController);
server.use('/api', vacationsController);
server.use('/api', imagesController);

server.use(catchAll);
server.listen(appConfig.port, () => console.log(`Listening to http://${appConfig.host}:${appConfig.port}`));