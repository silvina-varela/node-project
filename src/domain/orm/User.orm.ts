import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";

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



// TODO: 
// - get user by email