import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PereparatEntity } from '../entities/pereparat';

class PereparatController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(PereparatEntity).find({
            relations: {
                company: true,
                category_pereparat: true,
                descriptions: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(PereparatEntity).find({
            relations: {
                company: true,
                category_pereparat: true,
                descriptions: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_pereparat } = req.body

        const pereparat = await AppDataSource.getRepository(PereparatEntity).createQueryBuilder().insert().into(PereparatEntity).values({ name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_pereparat }).returning("*").execute()

        res.json({
            status: 201,
            message: "pereparat created",
            data: pereparat.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_pereparat } = req.body
            const { id } = req.params

            const pereparat = await AppDataSource.getRepository(PereparatEntity).createQueryBuilder().update(PereparatEntity)
                .set({ name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_pereparat })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "pereparat updated",
                data: pereparat.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const pereparat = await AppDataSource.getRepository(PereparatEntity).createQueryBuilder().delete().from(PereparatEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "pereparat deleted",
                data: pereparat.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PereparatController();