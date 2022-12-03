import express, { Request, Response } from "express";
import { AuthController } from '../controller/AuthController';
import bcrypt from 'bcrypt';
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from "../domain/interfaces/IAuth.interface";

//Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body parser --> middleware to read body request
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();



let authRouter = express.Router();

authRouter.route('/register')
    .post (jsonParser, async (req: Request, res: Response) => {

        let { name, email, password, age } = req?.body;
        let hashedPassword = '';

        if(password && name && email && age){
            // Obtain password in request
            hashedPassword = bcrypt.hashSync(password, 8)
        
        let newUser: IUser = {
            name,
            email,
            password: hashedPassword,
            age
        }

        // Controller instance to execute method
        const controller: AuthController = new AuthController();
        
        // Obtain response 
        const response: any = await controller.registerUser(newUser);

        // Send response to client
        return res.status(200).send(response);
 
        }
    }) 

authRouter.route('/login')
    .post (jsonParser, async (req: Request, res: Response) => {

        let { email, password } = req?.body;

        if(password && email){
        // Controller instance to execute method
        const controller: AuthController = new AuthController();
        
        let auth: IAuth = {
            email,
            password
        }

        // Obtain response 
        const response: any = await controller.loginUser(auth);

        // Send response to client
        return res.status(200).send(response);
 
        } else{
            return res.status(400).send({
                message: '[ERROR] Provide email and password'
            })
        }
    }) 

// Protected route by Verify Token middleware
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain user ID
        let id: any = req?.query?.id;

        if(id){
            // Controller
            const controller: AuthController = new AuthController;

            // Obtain response
            let response: any = await controller.userData(id);
            
            // If user is authorised
            return res.status(200).send(response);
        }else{
            return res.status(401).send({
                message: 'Not authorised to access this route'
            })
        }
    })



export default authRouter;