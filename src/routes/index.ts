/**
 * Root Router
 * Redirects to Routers
 */

import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import goodbyeRouter from './GoodbyeRouter';
import { LogInfo } from '../utils/logger';

// Server instance
let server = express();

// Router instance
let rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Response ) => {
    LogInfo('GET: // http://localhost:8000/api/');
    // Send response
    res.send('Welcome to my API');
});

// Redirects to routers
server.use('/', rootRouter); // http://localhost:8000/api/
server.use('/hello', helloRouter); // http://localhost:8000/api/hello/
server.use('/goodbye', goodbyeRouter); // http://localhost:8000/api/goodbye/


export default server;