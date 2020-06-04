import {Request, Response} from "express";
import knex from "../database/connection";

class StatesController {
    async index(req: Request, res: Response) {
        const states = await knex('state').select('*')

        return res.json(states);
    }
}

export default StatesController;