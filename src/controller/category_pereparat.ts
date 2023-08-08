import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CategoryPereparatEntity } from '../entities/category_pereparat';

class PereparatCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CategoryPereparatEntity).find({
            relations: {
                company: true,
                pereparat:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CategoryPereparatEntity).find({
            relations: {
                company: true,
                pereparat:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { title_uz, title_en, title_ru, company } = req.body

        const pereparat_category = await AppDataSource.getRepository(CategoryPereparatEntity).createQueryBuilder().insert().into(CategoryPereparatEntity).values({ title_uz, title_en, title_ru, company }).returning("*").execute()

        res.json({
            status: 201,
            message: "pereparat_category created",
            data: pereparat_category.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz, title_en, title_ru, company } = req.body
            const { id } = req.params

            const pereparat_category = await AppDataSource.getRepository(CategoryPereparatEntity).createQueryBuilder().update(CategoryPereparatEntity)
                .set({ title_uz, title_en, title_ru, company })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "pereparat_category updated",
                data: pereparat_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const pereparat_category = await AppDataSource.getRepository(CategoryPereparatEntity).createQueryBuilder().delete().from(CategoryPereparatEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "pereparat_category deleted",
                data: pereparat_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PereparatCategoryController();