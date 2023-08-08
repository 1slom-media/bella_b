import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { SertificatEntity } from '../entities/sertificat';

class SertificatController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(SertificatEntity).find({
            order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(SertificatEntity).find({
            where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { image} = req.body

        const sertificat = await AppDataSource.getRepository(SertificatEntity).createQueryBuilder().insert().into(SertificatEntity).values({ image }).returning("*").execute()

        res.json({
            status: 201,
            message: "sertificat created",
            data: sertificat.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { image } = req.body
            const { id } = req.params

            const sertificat = await AppDataSource.getRepository(SertificatEntity).createQueryBuilder().update(SertificatEntity)
                .set({ image })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "sertificat updated",
                data: sertificat.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const sertificat = await AppDataSource.getRepository(SertificatEntity).createQueryBuilder().delete().from(SertificatEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "sertificat deleted",
                data: sertificat.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new SertificatController();