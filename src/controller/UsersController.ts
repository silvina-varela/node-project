import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

// ORM
import { deleteUserByID, getAllUsers, getUserByID, createUser, updateUserByID } from '../domain/orm/User.orm';

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endopoint that retrieves users
     * @param {string} id Id of user to get (optional)
     * @returns All users or user by ID
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess('[/api/users] Get User By ID');

            response = await getUserByID(id);

        } else {
            LogSuccess('[/api/users] Get All Users Requested')

            response = await getAllUsers();
        }    
        return response;
    }

     /**
     * Endopoint that deletes user
     * @param {string} id Id of user to delete (optional)
     * @returns message
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess('[/api/users] Delete User By ID');

            deleteUserByID(id).then((r) => {
                response = {
                    message: 'User deleted successfully'
                }
            });

        } else {
            LogWarning('[/api/users] Delete User Requested without ID')

            response = {
                message: 'Please provide an ID'
            };
        }    
        return response;
    }

    @Post('/')
    public async createUser(user: any): Promise<any>{
        let response: any = '';

        await createUser(user).then((r) => {
            LogSuccess('[/api/users] Create User');

            response = {
                message: `User created: ${user.name}`
            }
        })
            

        }

        @Put('/')
        public async updateUser(id: string, user: any): Promise<any>{
            let response: any = '';

        if(id){
            LogSuccess('[/api/users] Update User By ID');

            await updateUserByID(id, user).then((r) => {
                response = {
                    message: 'User updated successfully'
                }
            });

        } else {
            LogWarning('[/api/users] Update User Requested without ID')

            response = {
                message: 'Please provide an ID'
            };
        }    
        return response;
            }
}