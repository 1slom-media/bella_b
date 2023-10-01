import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { CosmeticsEntity } from '../entities/cosmetics';

class CosmeticsController {
    public async Get(req: Request, res: Response): Promise<void> {
        const { categoryId, brandId } = req.query

        let query = AppDataSource.getRepository(CosmeticsEntity).createQueryBuilder('cosmetics').leftJoinAndSelect('cosmetics.category_cosmetics', 'category_cosmetics').leftJoinAndSelect('cosmetics.company', 'company').leftJoinAndSelect('cosmetics.descriptions', 'descriptions').orderBy("cosmetics.updateAt", 'DESC')

        if (categoryId && +categoryId > 0) {
            query = query.where('cosmetics.category_cosmetics.id = :category_id', { category_id: categoryId });
        }

        if (brandId && +brandId > 0) {
            query = query.andWhere('cosmetics.company.id = :company_id', { company_id: brandId });
        }

        const cosmetics = await query.getMany();
        res.json(cosmetics);
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(CosmeticsEntity).find({
            relations: {
                company: true,
                category_cosmetics: true,
                descriptions:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_cosmetics } = req.body

        const cosmetics = await AppDataSource.getRepository(CosmeticsEntity).createQueryBuilder().insert().into(CosmeticsEntity).values({ name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_cosmetics }).returning("*").execute()

        res.json({
            status: 201,
            message: "cosmetics created",
            data: cosmetics.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_cosmetics } = req.body
            const { id } = req.params

            const updateAt=new Date()

            const cosmetics = await AppDataSource.getRepository(CosmeticsEntity).createQueryBuilder().update(CosmeticsEntity)
                .set({ name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, company, category_cosmetics,updateAt })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "cosmetics updated",
                data: cosmetics.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const cosmetics = await AppDataSource.getRepository(CosmeticsEntity).createQueryBuilder().delete().from(CosmeticsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "cosmetics deleted",
                data: cosmetics.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new CosmeticsController();