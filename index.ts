import dotenv from 'dotenv';
import server from './src/server';
import { LogError, LogSuccess } from './src/utils/logger';

// Configuration .env file
dotenv.config();

const port: string | number = process.env.PORT || 8000;

// * Execute server and listen request to PORT
server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`);
});

// * Control Server error
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});
