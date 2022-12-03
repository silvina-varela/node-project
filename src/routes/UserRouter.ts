import { LogInfo } from "../utils/logger";
import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";

// Router from express
let usersRouter = express.Router();

usersRouter.route('/')
    // GET http://localhost:8000/api/users?id=
    .get(async (req: Request, res: Response) => {
        // Obtain query param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller instance to execute method
        const controller: UserController = new UserController();
        
        // Obtain response 
        const response: any = await controller.getUsers(id);

        // Send the client the response
        return res.status(200).send(response);
    })

    .delete(async (req: Request, res: Response) => {
        // Obtain query param
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller instance to execute method
        const controller: UserController = new UserController();
        
        // Obtain response 
        const response: any = await controller.deleteUser(id);

        // Send the client the response
        return res.status(response.status).send(response.message);
    })
    .put(async(req: Request, res: Response) => {
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;

        let id: any = req?.query?.id;

         // Controller instance to execute method
         const controller: UserController = new UserController();
        
         let user = {
            name: name,
            email: email,
            age: age
         }
         // Obtain response 
         const response: any = await controller.updateUser(id, user);
 
         // Send the client the response
         return res.status(response.status).send(response.message);
    })

//Export
export default usersRouter;


/**
 * get 200 OK
 * create 201 OK
 * delete 200(entity)/204(no return)
 * update 200(entitiy)/204(no return)
 */