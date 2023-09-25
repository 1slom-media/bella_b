import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CompanyEntity } from '../entities/company';

class CompanyController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(CompanyEntity).find({
            relations: {
                pereparat: true,
                aparat: true,
                cosmetics: true
            },
            order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CompanyEntity).find({
            relations: {
                pereparat: true,
                aparat: true,
                cosmetics: true
            },
            where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name, image, title_uz, title_ru, title_en, description_uz, description_en, description_ru } = req.body

        const company = await AppDataSource.getRepository(CompanyEntity).createQueryBuilder().insert().into(CompanyEntity).values({ name, image, title_uz, title_ru, title_en, description_uz, description_en, description_ru }).returning("*").execute()

        res.json({
            status: 201,
            message: "company created",
            data: company.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name, image, title_uz, title_ru, title_en, description_uz, description_en, description_ru } = req.body
            const { id } = req.params

            const company = await AppDataSource.getRepository(CompanyEntity).createQueryBuilder().update(CompanyEntity)
                .set({ name, image, title_uz, title_ru, title_en, description_uz, description_en, description_ru })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "company updated",
                data: company.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const company = await AppDataSource.getRepository(CompanyEntity).createQueryBuilder().delete().from(CompanyEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "company deleted",
                data: company.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CompanyController();