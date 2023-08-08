import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ParametrEntity } from '../entities/parametr';

class ParametrController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(ParametrEntity).find({
            relations: {
                aparat:true
            },
            order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(ParametrEntity).find({
            relations: {
                aparat:true
            },
            where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { parametr_uz,parametr_en,parametr_ru,information_uz,information_en,information_ru,aparat } = req.body

        const parametr = await AppDataSource.getRepository(ParametrEntity).createQueryBuilder().insert().into(ParametrEntity).values({ parametr_uz,parametr_en,parametr_ru,information_uz,information_en,information_ru,aparat }).returning("*").execute()

        res.json({
            status: 201,
            message: "parametr created",
            data: parametr.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { parametr_uz,parametr_en,parametr_ru,information_uz,information_en,information_ru,aparat } = req.body
            const { id } = req.params

            const parametr = await AppDataSource.getRepository(ParametrEntity).createQueryBuilder().update(ParametrEntity)
                .set({ parametr_uz,parametr_en,parametr_ru,information_uz,information_en,information_ru,aparat })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "parametr updated",
                data: parametr.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const parametr = await AppDataSource.getRepository(ParametrEntity).createQueryBuilder().delete().from(ParametrEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "parametr deleted",
                data: parametr.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new ParametrController();