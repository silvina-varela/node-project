import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

/**
 * @param {Request} req Original request pre-middleware verification 
 * @param {Response} res Response to jwt veritification
 * @param {NextFunction} next Next function 
 * @returns Verification error or next 
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // check HEADER from Request 'x-access-token'
    let token: any = req.headers['x-access-token'];

    // Verify if token is present
    if(!token){
        return res.status(403).send({
            authenticationError: 'Missing token',
            message: 'Not authorised to consume this endpoint'
        });
    };

    // Verify token
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if(err){
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT token'
            });
        }
        // If jwt is OK -- protected routes will be executed
        next();
    })
}