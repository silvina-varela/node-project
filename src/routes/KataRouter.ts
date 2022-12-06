import { LogInfo } from "../utils/logger";
import express, { Request, Response } from "express";
import { KatasController } from "../controller/KatasController";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

// JWT verifier Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

// Body parser --> middleware to read body request
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();


// Router from express
let katasRouter = express.Router();

katasRouter.route('/')
    // GET http://localhost:8000/api/users?id=
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain query param
        let id: any = req?.query?.id;

        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;


        LogInfo(`Query Param: ${id}`);

        // Controller instance to execute method
        const controller: KatasController = new KatasController();
        
        // Obtain response 
        const response: any = await controller.getKatas(page, limit, id);

        // Send the client the response
        return res.status(200).send(response);
    })

    .delete(verifyToken, async (req: Request, res: Response) => {
        // Obtain query param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller instance to execute method
        const controller: KatasController = new KatasController();
        
        // Obtain response 
        const response: any = await controller.deleteKata(id);

        // Send the client the response
        return res.status(200).send(response.message);
    })
    .put(jsonParser, verifyToken, async(req: Request, res: Response) => {
         let id: any = req?.query?.id;

         let name: string = req?.body?.name;
         let description: string = req?.body?.description || '';
         let level: KataLevel = req?.body?.level || KataLevel.BASIC;
         let attempts: number = req?.body?.attempts || 0;
         let stars: number = req?.body?.stars || 0;
         let creator: string = req?.body?.creator;
         let solution: string = req?.body?.solution;
         let participants: string[] = req?.body?.participants;


        if(name && description && level && attempts && stars && creator && solution && participants){
            // Controller instance to execute method
            const controller: KatasController = new KatasController();
           
            let kata: IKata = {
               name,
               description,
               level,
               attempts,
               stars,
               creator,
               solution,
               participants
            }
    
            // Obtain response 
            const response: any = await controller.updateKata(id, kata);
    
            // Send the client the response
            return res.status(response.status).send(response.message);

        } else {
            return res.status(400).send({
                message: '[ERROR] Updating kata. You need to send all attributes of kata.'
            })
        }

    })

    .post(jsonParser, verifyToken, async(req: Request, res: Response) => {
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || '';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let attempts: number = req?.body?.attempts || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution;
        let participants: string[] = req?.body?.participants;

       if(name && description && level && attempts >= 0 && stars >= 0 && creator && solution && participants.length >= 0){
           // Controller instance to execute method
           const controller: KatasController = new KatasController();
          
           let kata: IKata = {
              name,
              description,
              level,
              attempts,
              stars,
              creator,
              solution,
              participants
           }
   
           // Obtain response 
           const response: any = await controller.createKata(kata);
   
           // Send the client the response
           return res.status(201).send(response.message);

       } else {
           return res.status(400).send({
               message: '[ERROR] Creating kata. You need to send all attributes of kata.'
           })
       }

   })

export default katasRouter;