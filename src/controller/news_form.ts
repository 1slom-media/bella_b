import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { NewsFormEntity } from '../entities/news_form';

class NewsFormController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(NewsFormEntity).find({
            order: { id: "ASC" },relations:{
                news:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(NewsFormEntity).find({
            where: { id: +id },relations:{
                news:true
            }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { full_name,activity,position,clinic_name, phone,news } = req.body

        const newsForm = await AppDataSource.getRepository(NewsFormEntity).createQueryBuilder().insert().into(NewsFormEntity).values({ full_name,activity,position,clinic_name, phone,news }).returning("*").execute()

        res.json({
            status: 201,
            message: "newsForm created",
            data: newsForm.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { full_name,activity,position,clinic_name, phone,news } = req.body
            const { id } = req.params

            const newsForm = await AppDataSource.getRepository(NewsFormEntity).createQueryBuilder().update(NewsFormEntity)
                .set({ full_name,activity,position,clinic_name, phone,news })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "newsForm updated",
                data: newsForm.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const newsForm = await AppDataSource.getRepository(NewsFormEntity).createQueryBuilder().delete().from(NewsFormEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "newsForm deleted",
                data: newsForm.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new NewsFormController();