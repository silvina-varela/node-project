import express, { Express, Request, Response } from 'express';

// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO: HTTPS

// Import Root Router
import router from  '../routes'; 

// Create Express App
const server: Express = express();

// Define server to use /api and rootRouter
// http://localhost:8000/api
server.use(
    '/api',
    router
    );

// Static server
server.use(express.static('public'));

// TODO: Mongoose

// TODO: * Security config
server.use(helmet());
server.use(cors());

// * Content type config
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({limit: '50mb'}));

// * Redirect config
// http://localhost:8000/ --> redirect to /api
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api');
});


export default server;