import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

// CRUD
/**
 * Get all katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try{
        let kataModel = kataEntity();

        let response: any = {};

        // Search all users using pagination
        await kataModel.find({isDeleted: false})
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((katas: IKata[]) => {
                response.katas = katas;
            });

        // Count total documents in collection 'Katas'
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
    } catch(error){
        LogError(`[ORM ERROR]: Get All Katas: ${error}`);
    }
}

/**
 * Get kata by ID
 */
export const getKataByID = async (id: string): Promise<any | undefined> => {
   
    try{
        let kataModel = kataEntity();
        
        return await kataModel.findById(id);

    } catch (error){
        LogError(`[ORM ERROR]: Getting kata by ID: ${error}`);
    }
}

/**
 * Delete kata by ID
 */
 export const deleteKataByID = async (id: string): Promise<any | undefined> => {
   
    try{
        let kataModel = kataEntity();

        return await kataModel.deleteOne({_id: id});

    } catch (error){
        LogError(`[ORM ERROR]: Deleting kata by ID: ${error}`);
    }
}

/**
 * Create new kata
 */
export const createKata = async (kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        return await kataModel.create(kata);
        
    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata: ${error}`);

    }
}
// - update kata
export const updateKataByID = async (id: string, kata: IKata): Promise<any | undefined> => {
try {
    let kataModel = kataEntity();

    return await kataModel.findByIdAndUpdate(id, kata);

 } catch (error) {
    LogError(`[ORM ERROR]: Updating kata with id ${id}: ${error}`);
 }
}