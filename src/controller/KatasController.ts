import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import { IKataController } from "./interfaces";

import { deleteKataByID, getAllKatas, getKataByID, updateKataByID, createKata } from '../domain/orm/Kata.orm';
import { IKata } from '@/domain/interfaces/IKata.interface';


@Route("/api/katas")
@Tags("KatasController")
export class KatasController implements IKataController {
    /**
     * Endopoint that retrieves katas
     * @param {string} id Id of kata to get (optional)
     * @returns All katas or kata by ID
     */
     @Get("/")
     public async getKatas(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {
         
         let response: any = '';
 
         if(id){
             LogSuccess('[/api/katas] Get Kata By ID');
 
             response = await getKataByID(id);
 
         } else {
             LogSuccess('[/api/katas] Get All Katas Requested')
 
             response = await getAllKatas(page, limit);
         }    
         return response;
     }
   /**
     * Endopoint that deletes katas
     * @param {string} id Id of kata to delete (optional)
     * @returns message
     */
    @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any> {
        
        let response: any = '';

        if(id){
            LogSuccess('[/api/katas] Delete Kata By ID');

            deleteKataByID(id).then((r) => {
                response = {
                    status: 204,
                    message: 'Kata deleted successfully'
                }
            });

        } else {
            LogWarning('[/api/katas] Delete Kata Requested without ID')
            response = {
                status: 400,
                message: 'Please provide an ID'
            };
        }    
        return response;
    }
    
    @Put('/')
        public async updateKata(id: string, kata: IKata): Promise<any>{
            let response: any = '';

        if(id){
            LogSuccess('[/api/katas] Update Kata By ID');

            await updateKataByID(id, kata).then((r) => {
                response = {
                    status: 204,
                    message: 'Kata updated successfully'
                }
            });

        } else {
            LogWarning('[/api/katas] Update Kata Requested without ID')

            response = {
                status: 400,
                message: 'Please provide an ID'
            };
        }    
        return response;
            }

    @Post('/')
    public async createKata(kata: IKata): Promise<any> {
        let response: any = '';

        if(kata){
            await createKata(kata).then((r) => {
                LogSuccess('[/api/katas] Kata created');
                response = {
                    message: `Kata created successfully: ${kata.name}`
                }
            })

        } else {
            LogWarning('[/api/katas] Create needs kata')

            response = {
                status: 400,
                message: 'Kata not created. Please provide kata'
            };
        }    
        
        return response;
    }
    

}

