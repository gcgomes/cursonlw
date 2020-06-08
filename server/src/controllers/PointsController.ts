import {Request, Response} from "express";
import knex from "../database/connection";

class PointController {
    async index(req: Request, res: Response) {
        const {city, uf, items} = req.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_has_items', 'points.id', '=', 'points_has_items.points_id')
            .whereIn('points_has_items.items_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...points,
                image_url: `http://192.168.0.104:3333/uploads/${point.image}`
            }
        });

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('points.id', id).select('*').first();

        if(!point) {
            return res.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint =  {
            ...point,
            image_url: `http://192.168.0.104:3333/uploads/${point.image}`
        };

        const items = await knex('items')
            .join('points_has_items', 'items.id', '=', 'points_has_items.items_id')
            .where('points_has_items.points_id', id)
            .select('items.title');

        return res.json({ point: serializedPoint, items });
    };

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        const trx = await knex.transaction();

        const point = {
            name,
            email,
            whatsapp,
            image: req.file.filename,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point);

        const points_id = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string)=> Number(item.trim()))
            .map((items_id: number) => {
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