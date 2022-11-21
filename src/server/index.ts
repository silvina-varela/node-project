import express, { Express, Request, Response } from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';


// Security
import cors from 'cors';
import helmet from 'helmet';

// TODO: HTTPS

// Import Root Router
import router from  '../routes'; 
import mongoose from 'mongoose';

// Create Express App
const server: Express = express();

//* Swagger config and route
server.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
            explorer: true
        }
    })
);



// Define server to use /api and rootRouter
// http://localhost:8000/api
server.use(
    '/api',
    router
    );

// Static server
server.use(express.static('public'));

// Mongoose
mongoose.connect('mongodb://localhost:27017/codeverification')

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