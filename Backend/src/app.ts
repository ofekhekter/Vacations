import express from 'express';
import cors from "cors";
import { appConfig } from './Utils/appConfig';
import authController from './Controllers/auth-controller';
import { catchAll } from './Middleware/catch-all';
import vacationsController from './Controllers/vacations-controller';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/api', authController);
server.use('/api', vacationsController);

server.use(catchAll);
server.listen(appConfig.port, () => console.log(`Listening to http://${appConfig.host}:${appConfig.port}`));