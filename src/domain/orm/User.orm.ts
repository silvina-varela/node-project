import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "@/utils/logger";

// CRUD

/**
 * Get all users from Collection "Users" in Mongo Server
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try{
        let userModel = userEntity();

        // Search users
        return await userModel.find({isDelete: false});
    } catch(error){
        LogError(`[ORM ERROR]: Get All Users: ${error}`);
    }
}

// TODO: 
// - get user by ID
// - get user by email
// - delete user by id
// - create user
// - update user