import {Request, Response} from "express";
import knex from "../database/connection";

class PointController {
    async index(req: Request, res: Response) {
        const {city, state_id, items} = req.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_has_items', 'points.id', '=', 'points_has_items.points_id')
            .whereIn('points_has_items.items_id', parsedItems)
            .where('city', String(city))
            .where('state_id', Number(state_id))
            .distinct()
            .select('points.*');

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').innerJoin('state', 'points.state_id', '=', 'state.id').where('points.id', id).select('points.*', 'state.abbreviation as uf').first();

        if(!point) {
            return res.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('points_has_items', 'items.id', '=', 'points_has_items.items_id')
            .where('points_has_items.points_id', id)
            .select('items.title');

        return res.json({ point, items });
    };

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state_id,
            items
        } = req.body;

        const trx = await knex.transaction();

        const point = {
            name,
            email,
            whatsapp,
            image: 'fake-image',
            latitude,
            longitude,
            city,
            state_id,
        };

        const insertedIds = await trx('points').insert(point);

        const points_id = insertedIds[0];

        const pointItems = items.map((items_id: number) => {
            return {
                items_id,
                points_id
            }
        });

        await trx('points_has_items').insert(pointItems);

        await trx.commit();

        return res.json({
            id: points_id,
            ...point
        });
    };
}

export default PointController;