import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CategoryCosmeticsEntity } from '../entities/category_cosmetic';

class CosmeticsCategoryController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CategoryCosmeticsEntity).find({
            relations: {
                company: true,
                cosmetics:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CategoryCosmeticsEntity).find({
            relations: {
                company: true,
                cosmetics:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { title_uz, title_en, title_ru, company } = req.body

        const cosmetics_category = await AppDataSource.getRepository(CategoryCosmeticsEntity).createQueryBuilder().insert().into(CategoryCosmeticsEntity).values({ title_uz, title_en, title_ru, company }).returning("*").execute()

        res.json({
            status: 201,
            message: "cosmetics_category created",
            data: cosmetics_category.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { title_uz, title_en, title_ru, company } = req.body
            const { id } = req.params

            const cosmetics_category = await AppDataSource.getRepository(CategoryCosmeticsEntity).createQueryBuilder().update(CategoryCosmeticsEntity)
                .set({ title_uz, title_en, title_ru, company })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "cosmetics_category updated",
                data: cosmetics_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const cosmetics_category = await AppDataSource.getRepository(CategoryCosmeticsEntity).createQueryBuilder().delete().from(CategoryCosmeticsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "cosmetics_category deleted",
                data: cosmetics_category.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CosmeticsCategoryController();