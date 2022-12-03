import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// CRUD

/**
 * Get all users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try{
        let userModel = userEntity();

        // Search users
        return await userModel.find({isDelete: false});
    } catch(error){
        LogError(`[ORM ERROR]: Get All Users: ${error}`);
    }
}

/**
 * Get user by ID
 */
export const getUserByID = async (id: string): Promise<any | undefined> => {
   
    try{
        let userModel = userEntity();

        return await userModel.findById(id);

    } catch (error){
        LogError(`[ORM ERROR]: Getting user by ID: ${error}`);
    }
}

/**
 * Delete user by ID
 */
 export const deleteUserByID = async (id: string): Promise<any | undefined> => {
   
    try{
        let userModel = userEntity();

        return await userModel.deleteOne({_id: id});

    } catch (error){
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`);
    }
}

/**
 * Create new user
 */
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`);

    }
}
// - update user
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {
try {
    let userModel = userEntity();

    return await userModel.findByIdAndUpdate(id, user);

 } catch (error) {
    LogError(`[ORM ERROR]: Updating user with id ${id}: ${error}`);

 }
}

//TODO:
// Register user
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        return await userModel.create(user);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Register user: ${error}`);

    }
}


// LogIn user
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Find user by email
        userModel.findOne({email: auth.email}, (err: any, user: IUser) => {
            if(err){
                // TODO: return error while searching (500)
            } 
            if(!user){
                //TODO: return error user not found (404)
            }

            // Use bcrypt to compare passwords
            let validPassword = bcrypt.compareSync(auth.password, user.password);

            if(!validPassword){
                //TODO: error 401 (not authorised)
            } 

            // Create JWT
        

        // TODO: create jwt
        // TODO: Add secret in .env
        let token = jwt.sign({email: user.email}, 'SECRET', {
            expiresIn: '2h'
        });

        return token;

    })
     } catch (error) {
    
     }
}

//LogOut user
export const logoutUser = async (user: IUser): Promise<any | undefined> => {
    try {
        
     } catch (error) {
    
     }
}
