import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

import { registerUser, loginUser, logoutUser, getUserByID } from '../domain/orm/User.orm';
import { AuthResponse, ErrorResponse } from './types';

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
                message: 'User not registered. Please provide user'
            };
        }    
        
        return response;
    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;
        
        if(auth){
            LogSuccess('[/api/auth/login] User logged in');
            let data = await loginUser(auth)
            response = {
                    message: `Welcome, ${data.user.name}`,
                    token: data.token // jwt generated for logged in user
                }
            
        } else{
            LogWarning('[/api/auth/login] Needs password and email to login')
            response = {
                message: 'Please provide email and password to login',
                error: '[Auth Error] Email and password are required',
            };
        }

        return response;
       
    }

      /**
     * Endopoint that retrieves user
     * Middleware: Validate JWT
     * Headers: must add x-access-token with valid JWT
     * @param {string} id user's ID to get
     * @returns User by ID
     */
    @Get('/me')
    public async userData(@Query()id: string): Promise<any> {
        let response: any = '';

        if(id){
            LogSuccess(`[/api/users] Get User Data By ID: ${id}`);
            response = await getUserByID(id);
            //Remove password
            response.password = '';
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