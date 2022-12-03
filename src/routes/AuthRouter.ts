import express, { Request, Response } from "express";
import { AuthController } from '../controller/AuthController';
import bcrypt from 'bcrypt';
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from "../domain/interfaces/IAuth.interface";


let authRouter = express.Router();

authRouter.route('/auth/register')
    .post (async (req: Request, res: Response) => {

        let { name, email, password, age } = req.body;
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

authRouter.route('/auth/login')
    .post (async (req: Request, res: Response) => {

        let { email, password } = req.body;

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
 
        }
    }) 

export default authRouter;