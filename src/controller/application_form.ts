import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { FormaAppEntity } from '../entities/application_form';

class FormAppController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(FormaAppEntity).find({
            order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(FormaAppEntity).find({
            where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name, phone_number, email} = req.body

        const formaApp = await AppDataSource.getRepository(FormaAppEntity).createQueryBuilder().insert().into(FormaAppEntity).values({ name, phone_number, email }).returning("*").execute()

        res.json({
            status: 201,
            message: "formaApp created",
            data: formaApp.raw[0]
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name, phone_number, email } = req.body
            const { id } = req.params

            const formaApp = await AppDataSource.getRepository(FormaAppEntity).createQueryBuilder().update(FormaAppEntity)
                .set({ name, phone_number, email })
                .where({ id })
                .returning("*")
                .execute()

            res.json({
                status: 200,
                message: "formaApp updated",
                data: formaApp.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const formaApp = await AppDataSource.getRepository(FormaAppEntity).createQueryBuilder().delete().from(FormaAppEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "formaApp deleted",
                data: formaApp.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new FormAppController();