import express, { Express, Request, Response } from "express"; 
import dotenv from 'dotenv';

// Configuration .env file
dotenv.config();

// Create Express App
const app: Express = express();
const port: string | number = process.env.PORT || 8000;

// Define first Route of app
app.get('/', (req: Request, res: Response ) => {
    // Send response
    res.status(200).json({data: {message: 'Goodbye, world'}})
});

app.get('/hello', (req: Request, res: Response ) => {
    // Send response
    const { name } = req.query;
    res.status(200).json({data: {message: `Hola, ${name || 'anónimo'}`}})
});



// Execute APP and listen request to PORT
app.listen(port, () => console.log(`Express server running at http://localhost:${port}`)) 