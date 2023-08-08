import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { SampleEntity } from '../entities/sample';

class SampleController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(SampleEntity).find({
            relations: {
                aparat:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(SampleEntity).find({
            relations: {
                aparat:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name_uz, name_en, name_ru,aparat } = req.body

        const sample = await AppDataSource.getRepository(SampleEntity).createQueryBuilder().insert().into(SampleEntity).values({ name_uz, name_en, name_ru,aparat }).returning("*").execute()

        res.json({
            status: 201,
            message: "sample created",
            data: sample.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name_uz, name_en, name_ru,aparat } = req.body
            const { id } = req.params

            const sample = await AppDataSource.getRepository(SampleEntity).createQueryBuilder().update(SampleEntity)
                .set({ name_uz, name_en, name_ru,aparat })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "sample updated",
                data: sample.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const sample = await AppDataSource.getRepository(SampleEntity).createQueryBuilder().delete().from(SampleEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "sample deleted",
                data: sample.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new SampleController();