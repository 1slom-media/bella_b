import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CategoryApparatEntity } from '../entities/category_apparat';

class AppratCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CategoryApparatEntity).find({
            relations: {
                aparat: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CategoryApparatEntity).find({
            relations: {
                aparat: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { title_uz, title_en, title_ru} = req.body

        const apparat_category = await AppDataSource.getRepository(CategoryApparatEntity).createQueryBuilder().insert().into(CategoryApparatEntity).values({ title_uz, title_en, title_ru}).returning("*").execute()

        res.json({
            status: 201,
            message: "apparat_category created",
            data: apparat_category.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz, title_en, title_ru} = req.body
            const { id } = req.params

            const apparat_category = await AppDataSource.getRepository(CategoryApparatEntity).createQueryBuilder().update(CategoryApparatEntity)
                .set({ title_uz, title_en, title_ru})
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "apparat_category updated",
                data: apparat_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const apparat_category = await AppDataSource.getRepository(CategoryApparatEntity).createQueryBuilder().delete().from(CategoryApparatEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "apparat_category deleted",
                data: apparat_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AppratCategoryController();