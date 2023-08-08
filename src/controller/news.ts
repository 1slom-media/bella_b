import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { NewsEntity } from '../entities/news';

class NewsController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(NewsEntity).find({
            order: { id: "ASC" },relations:{
                news_form:true
            }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params
        res.json(await AppDataSource.getRepository(NewsEntity).find({
            where: { id: +id },relations:{
                news_form:true
            }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { image, title_uz, title_en, title_ru, description_en, description_uz, description_ru, time_date } = req.body

        const news = new NewsEntity

        news.image = image
        news.title_uz = title_uz
        news.title_en = title_en
        news.title_ru = title_ru
        news.description_uz = description_uz
        news.description_en = description_en
        news.description_ru = description_ru
        news.time_date = new Date(time_date)

        await AppDataSource.manager.save(news)

        res.json({
            status: 201,
            message: "news created",
            data: news
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { image, title_uz, title_en, title_ru, description_en, description_uz, description_ru, time_date } = req.body
            const { id } = req.params

            const news = await AppDataSource.getRepository(NewsEntity).createQueryBuilder().update(NewsEntity)
                .set({ image, title_uz, title_en, title_ru, description_en, description_uz, description_ru, time_date })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "news updated",
                data: news.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const news = await AppDataSource.getRepository(NewsEntity).createQueryBuilder().delete().from(NewsEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "news deleted",
                data: news.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new NewsController();