import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { AparatEntity } from '../entities/aparat';
import { PartnersEntity } from '../entities/partners';

class AparatController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(AparatEntity).find({
            relations: {
                company: true,
                category_aparat: true,
                partners: true,
                descriptions:true,
                sample:true,
                photos:true,
                design:true,
                parametr:true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(AparatEntity).find({
            relations: {
                company: true,
                category_aparat: true,
                partners: true,
                descriptions:true,
                sample:true,
                photos:true,
                design:true,
                parametr:true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, product_benefits, company, category_aparat, partners } = req.body

        const foundPartners = await AppDataSource.getRepository(PartnersEntity).find({ where: { id: partners } })


        const aparat = new AparatEntity()
        if (foundPartners && partners) {
            aparat.name_uz = name_uz
            aparat.name_en = name_en
            aparat.name_ru = name_ru
            aparat.description_uz = description_uz
            aparat.description_en = description_en
            aparat.description_ru = description_ru
            aparat.image1 = image1
            aparat.image2 = image2
            aparat.image3 = image3
            aparat.pdf = pdf
            aparat.product_benefits = product_benefits
            aparat.company = company
            aparat.category_aparat = category_aparat
            aparat.partners = foundPartners
        }
        aparat.name_uz = name_uz
        aparat.name_en = name_en
        aparat.name_ru = name_ru
        aparat.description_uz = description_uz
        aparat.description_en = description_en
        aparat.description_ru = description_ru
        aparat.image1 = image1
        aparat.image2 = image2
        aparat.image3 = image3
        aparat.pdf = pdf
        aparat.product_benefits = product_benefits
        aparat.company = company
        aparat.category_aparat = category_aparat

        await AppDataSource.manager.save(aparat)

        res.json({
            status: 201,
            message: "aparat created",
            data: aparat
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, pdf, product_benefits, company, category_aparat, partners } = req.body
            const { id } = req.params

            const foundPartners = await AppDataSource.getRepository(PartnersEntity).find({ where: { id: partners } })

            const aparat = await AppDataSource.getRepository(AparatEntity).findOneBy({ id: +id })

            if (foundPartners && partners) {
                aparat.name_uz = name_uz != undefined ? name_uz : aparat.name_uz
                aparat.name_en = name_en != undefined ? name_en : aparat.name_en
                aparat.name_ru = name_ru != undefined ? name_ru : aparat.name_ru
                aparat.description_uz = description_uz != undefined ? description_uz : aparat.description_uz
                aparat.description_en = description_en != undefined ? description_en : aparat.description_en
                aparat.description_ru = description_ru != undefined ? description_ru : aparat.description_ru
                aparat.image1 = image1 != undefined ? image1 : aparat.image1
                aparat.image2 = image2 != undefined ? image2 : aparat.image2
                aparat.image3 = image3 != undefined ? image3 : aparat.image3
                aparat.pdf = pdf != undefined ? pdf : aparat.pdf
                aparat.product_benefits = product_benefits != undefined ? product_benefits : aparat.product_benefits
                aparat.company = company != undefined ? company : aparat.company
                aparat.category_aparat = category_aparat != undefined ? category_aparat : aparat.category_aparat
                aparat.partners = foundPartners
            }
            aparat.name_uz = name_uz != undefined ? name_uz : aparat.name_uz
            aparat.name_en = name_en != undefined ? name_en : aparat.name_en
            aparat.name_ru = name_ru != undefined ? name_ru : aparat.name_ru
            aparat.description_uz = description_uz != undefined ? description_uz : aparat.description_uz
            aparat.description_en = description_en != undefined ? description_en : aparat.description_en
            aparat.description_ru = description_ru != undefined ? description_ru : aparat.description_ru
            aparat.image1 = image1 != undefined ? image1 : aparat.image1
            aparat.image2 = image2 != undefined ? image2 : aparat.image2
            aparat.image3 = image3 != undefined ? image3 : aparat.image3
            aparat.pdf = pdf != undefined ? pdf : aparat.pdf
            aparat.product_benefits = product_benefits != undefined ? product_benefits : aparat.product_benefits
            aparat.company = company != undefined ? company : aparat.company
            aparat.category_aparat = category_aparat != undefined ? category_aparat : aparat.category_aparat

            await AppDataSource.manager.save(aparat)


            res.json({
                status: 200,
                message: "aparat updated",
                data: aparat
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const aparat = await AppDataSource.getRepository(AparatEntity).createQueryBuilder().delete().from(AparatEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "aparat deleted",
                data: aparat.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new AparatController();