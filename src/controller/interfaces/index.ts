import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse } from "../types";


export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IByeController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IUserController {
    // Get all users or get user by ID
    getUsers(id?: string): Promise<any>

    // Delete user by ID
    deleteUser(id?: string): Promise<any>

    // Update 
    updateUser(id: string, user: any): Promise<any>
}

export interface IAuthController {
    // Register users
    registerUser(user: IUser): Promise<any>

    //LogIn user
    loginUser(auth: any): Promise<any>
}