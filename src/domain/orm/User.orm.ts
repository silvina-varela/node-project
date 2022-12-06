import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UsersResponse } from "../types/UsersResponse.type";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";


// Config env variables
dotenv.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

// CRUD

/**
 * Get all users from Collection "Users" in Mongo Server
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try{
        let userModel = userEntity();

        let response: any = {};

        // Search all users using pagination
        await userModel.find({isDeleted: false})
            .select('name email age katas')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((users: IUser[]) => {
                response.users = users;
            });

        // Count total documents in collection 'Users'
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
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
        
        return await userModel.findById(id).select('name email age katas');

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

// - update user
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {
try {
    let userModel = userEntity();

    return await userModel.findByIdAndUpdate(id, user);

 } catch (error) {
    LogError(`[ORM ERROR]: Updating user with id ${id}: ${error}`);

 }
}

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
        
        let userFound: IUser | undefined = undefined;
        let token = undefined;
    
        // Check if user exists
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[ERROR Auth] User not found`)
            throw new Error(`[ERROR Auth: ${error}] User not found`)
        });
     
        // Use bcrypt to compare passwords
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword){
            console.error(`[ERROR Auth] Password not valid`)
            throw new Error(`[ERROR Auth] Password not valid`)        
        } 

        // Generate JWT
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: '2h'
        });

        return {
            user: userFound,
            token
        };
     } catch (error) {
        LogError(`[ORM ERROR] ${error}`)
     }
}

//LogOut user
export const logoutUser = async (user: IUser): Promise<any | undefined> => {
    try {
        
     } catch (error) {
    
     }
}

export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {
    try{
        let userModel = userEntity();
        let katasModel = kataEntity();

        let katasFound: IKata[] = []; 

        let response: any = {
            katas: []
        };

        userModel.findById(id).then((user: IUser) => {
            response.user = user.email;

            let objectIds: mongoose.Types.ObjectId[] = [];

            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID);
            })

            katasModel.find({"_id": {"$in": user.katas}}).then((katas: IKata[]) => {
                katasFound = katas;
            })
            
            
        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining User: ${error}`);
        })
        
        response.katas = katasFound;
        
        return response;
    } catch(error){
        LogError(`[ORM ERROR]: Get Users' katas: ${error}`);
    }
}