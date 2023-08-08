import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DesignEntity } from '../entities/design';

class DesignController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(DesignEntity).find({
            relations: {
                aparat:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(DesignEntity).find({
            relations: {
                aparat:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { before,after,aparat } = req.body

        const design = await AppDataSource.getRepository(DesignEntity).createQueryBuilder().insert().into(DesignEntity).values({ before,after,aparat }).returning("*").execute()

        res.json({
            status: 201,
            message: "design created",
            data: design.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { before,after,aparat } = req.body
            const { id } = req.params

            const design = await AppDataSource.getRepository(DesignEntity).createQueryBuilder().update(DesignEntity)
                .set({ before,after,aparat })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "design updated",
                data: design.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const design = await AppDataSource.getRepository(DesignEntity).createQueryBuilder().delete().from(DesignEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "design deleted",
                data: design.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new DesignController();