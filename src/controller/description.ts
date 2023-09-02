import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DescriptionEntity } from '../entities/descriptions';

class Descriptionontroller {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(DescriptionEntity).find({
            relations: {
                aparat: true,
                pereparat: true,
                cosmetics:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(DescriptionEntity).find({
            relations: {
                aparat: true,
                pereparat: true,
                cosmetics:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { description_uz, description_en, description_ru, youtube_link, aparat, pereparat,cosmetics } = req.body

        const description = await AppDataSource.getRepository(DescriptionEntity).createQueryBuilder().insert().into(DescriptionEntity).values({ description_uz, description_en, description_ru, youtube_link, aparat, pereparat,cosmetics }).returning("*").execute()

        res.json({
            status: 201,
            message: "description created",
            data: description.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { description_uz, description_en, description_ru, youtube_link, aparat, pereparat,cosmetics } = req.body
            const { id } = req.params

            const description = await AppDataSource.getRepository(DescriptionEntity).createQueryBuilder().update(DescriptionEntity)
                .set({ description_uz, description_en, description_ru, youtube_link, aparat, pereparat,cosmetics })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "description updated",
                data: description.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const description = await AppDataSource.getRepository(DescriptionEntity).createQueryBuilder().delete().from(DescriptionEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "description deleted",
                data: description.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new Descriptionontroller();