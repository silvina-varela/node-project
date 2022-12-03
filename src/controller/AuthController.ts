import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

import { registerUser, loginUser, logoutUser } from '../domain/orm/User.orm';

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';

        if(user){
            await registerUser(user).then((r) => {
                LogSuccess('[/api/auth/register] User registered');
                response = {
                    message: `User registered successfully: ${user.name}`
                }
            })

        } else {
            LogWarning('[/api/auth/register] Register needs user')

            response = {
                status: 400,
                message: 'Please provide user'
            };
        }    
        
        return response;
    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {
        let response: any = '';
        
        if(auth){
            await loginUser(auth).then((r) => {
                LogSuccess('[/api/auth/login] User logged in');
    
                response = {
                    message: `User logged in successfully: ${auth.email}`,
                    token: r.token // jwt generated for logged in user
                }
            })
        } else{
            LogWarning('[/api/auth/login] Needs password and email to login')
            response = {
                status: 400,
                message: 'Please provide email and password to login'
            };
        }

        return response;
       
    }

    @Post('/logout')
    public async logoutUser(): Promise<any>{
        let response: any = '';
        
        //TODO 
        throw new Error('Error');
    }


}