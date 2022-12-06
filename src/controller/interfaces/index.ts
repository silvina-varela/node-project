import { IKata } from "@/domain/interfaces/IKata.interface";
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
    getUsers(page: number, limit: number, id?: string): Promise<any>

    // Delete user by ID
    deleteUser(id?: string): Promise<any>

    // Update 
    updateUser(id: string, user: any): Promise<any>

    // Get katas of user
    getKatas(page: number, limit: number, id: string): Promise<any>

}

export interface IAuthController {
    // Register users
    registerUser(user: IUser): Promise<any>

    //LogIn user
    loginUser(auth: any): Promise<any>
}

export interface IKataController {
    // Get all katas or get kata by ID
    getKatas(page: number, limit: number, id?: string): Promise<any>

    // Get all katas of a user


    // Create kata
    createKata(kata: IKata): Promise<any>
    
    // Delete kata by ID
    deleteKata(id?: string): Promise<any>

    // Update kata
    updateKata(id: string, kata: any): Promise<any>
}