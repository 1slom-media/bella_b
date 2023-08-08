import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PhotosEntity } from '../entities/photos';

class PhotosController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(PhotosEntity).find({
            relations: {
                aparat:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(PhotosEntity).find({
            relations: {
                aparat:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { image1, image2,image3,image4,video,aparat } = req.body

        const photos = await AppDataSource.getRepository(PhotosEntity).createQueryBuilder().insert().into(PhotosEntity).values({ image1, image2,image3,image4,video,aparat }).returning("*").execute()

        res.json({
            status: 201,
            message: "photos created",
            data: photos.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { image1, image2,image3,image4,video,aparat } = req.body
            const { id } = req.params

            const photos = await AppDataSource.getRepository(PhotosEntity).createQueryBuilder().update(PhotosEntity)
                .set({ image1, image2,image3,image4,video,aparat })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "photos updated",
                data: photos.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const photos = await AppDataSource.getRepository(PhotosEntity).createQueryBuilder().delete().from(PhotosEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "photos deleted",
                data: photos.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PhotosController();