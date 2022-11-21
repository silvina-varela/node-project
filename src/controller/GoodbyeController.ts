import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IByeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

@Route("/api/goodbye")
@Tags("GoodbyeController")
export class GoodbyeController implements IByeController {
    @Get("/")
    public async getMessage(@Query()name?: string): Promise<BasicResponse> {
        LogSuccess('[/api/goodbye] Get Request');

        let date_ob = new Date();
        // adjust 0 before single digit date
        let day = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // prints date in YYYY-MM-DD format
       let today = day + "-" + month + "-" + year;

        return {
            message: `Goodbye, ${name || 'World'}`,
            date: today
        }
    }
    
}