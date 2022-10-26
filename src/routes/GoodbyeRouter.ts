import { GoodbyeController } from "../controller/GoodbyeController";
import express, { Request, Response } from "express";
import { LogInfo } from "../utils/logger";


// Router from express
let goodbyeRouter = express.Router();


goodbyeRouter.route('/')
    // GET http://localhost:8000/api/goodbye?name=${...}
    .get(async (req: Request, res: Response) => {
        // Obtain a query param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);

        // Controller instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        
        // Obtain response 
        const response = await controller.getMessage(name);

        // Send to the client the response
        return res.send(response);
    })


    //Export
    export default goodbyeRouter;