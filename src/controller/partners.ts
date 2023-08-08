import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { PartnersEntity } from '../entities/partners';
import { AparatEntity } from '../entities/aparat';

class PartnersController {
    public async Get(req: Request, res: Response): Promise<void> {
        res.json(await AppDataSource.getRepository(PartnersEntity).find({
            relations: {
                aparat: true
            }, order: { id: "ASC" }
        }));
    }

    public async GetId(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        res.json(await AppDataSource.getRepository(PartnersEntity).find({
            relations: {
                aparat: true
            }, where: { id: +id }
        }));
    }

    public async Post(req: Request, res: Response) {
        const { logo, name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, video, location, phone_number1, phone_number2, telegram_link, facebook_link, instagram_link, aparat } = req.body

        const foundAparat = await AppDataSource.getRepository(AparatEntity).find({ where: { id: aparat } })

        const partners = new PartnersEntity()
        if (foundAparat && aparat) {
            partners.logo = logo
            partners.name_uz = name_uz
            partners.name_en = name_en
            partners.name_ru = name_ru
            partners.description_uz = description_uz
            partners.description_en = description_en
            partners.description_ru = description_ru
            partners.image1 = image1
            partners.image2 = image2
            partners.image3 = image3
            partners.video = video
            partners.location = location
            partners.phone_number1 = phone_number1
            partners.phone_number2 = phone_number2
            partners.telegram_link = telegram_link
            partners.facebook_link = facebook_link
            partners.instagram_link = instagram_link
            partners.aparat = foundAparat
        }
        partners.logo = logo
        partners.name_uz = name_uz
        partners.name_en = name_en
        partners.name_ru = name_ru
        partners.description_uz = description_uz
        partners.description_en = description_en
        partners.description_ru = description_ru
        partners.image1 = image1
        partners.image2 = image2
        partners.image3 = image3
        partners.video = video
        partners.location = location
        partners.phone_number1 = phone_number1
        partners.phone_number2 = phone_number2
        partners.telegram_link = telegram_link
        partners.facebook_link = facebook_link
        partners.instagram_link = instagram_link


        await AppDataSource.manager.save(partners)

        res.json({
            status: 201,
            message: "pereparat created",
            data: partners
        })
    }

    public async Put(req: Request, res: Response) {
        try {
            const { logo, name_uz, name_en, name_ru, description_uz, description_en, description_ru, image1, image2, image3, video, location, phone_number1, phone_number2, telegram_link, facebook_link, instagram_link, aparat } = req.body
            const { id } = req.params

            const foundAparat = await AppDataSource.getRepository(AparatEntity).find({ where: { id: aparat } })

            const partners = await AppDataSource.getRepository(PartnersEntity).findOneBy({ id: +id })

            if (foundAparat && aparat) {
                partners.logo = logo != undefined ? logo : partners.logo
                partners.name_uz = name_uz != undefined ? name_uz : partners.name_uz
                partners.name_en = name_en != undefined ? name_en : partners.name_en
                partners.name_ru = name_ru != undefined ? name_ru : partners.name_ru
                partners.description_uz = description_uz != undefined ? description_uz : partners.description_uz
                partners.description_en = description_en != undefined ? description_en : partners.description_en
                partners.description_ru = description_ru != undefined ? description_ru : partners.description_ru
                partners.image1 = image1 != undefined ? image1 : partners.image1
                partners.image2 = image2 != undefined ? image2 : partners.image2
                partners.image3 = image3 != undefined ? image3 : partners.image3
                partners.video = video
                partners.location = location != undefined ? location : partners.location
                partners.phone_number1 = phone_number1 != undefined ? phone_number1 : partners.phone_number1
                partners.phone_number2 = phone_number2 != undefined ? phone_number2 : partners.phone_number2
                partners.telegram_link = telegram_link != undefined ? telegram_link : partners.telegram_link
                partners.facebook_link = facebook_link != undefined ? facebook_link : partners.facebook_link
                partners.instagram_link = instagram_link != undefined ? instagram_link : partners.instagram_link
                partners.aparat = foundAparat
            }
            partners.logo = logo != undefined ? logo : partners.logo
            partners.name_uz = name_uz != undefined ? name_uz : partners.name_uz
            partners.name_en = name_en != undefined ? name_en : partners.name_en
            partners.name_ru = name_ru != undefined ? name_ru : partners.name_ru
            partners.description_uz = description_uz != undefined ? description_uz : partners.description_uz
            partners.description_en = description_en != undefined ? description_en : partners.description_en
            partners.description_ru = description_ru != undefined ? description_ru : partners.description_ru
            partners.image1 = image1 != undefined ? image1 : partners.image1
            partners.image2 = image2 != undefined ? image2 : partners.image2
            partners.image3 = image3 != undefined ? image3 : partners.image3
            partners.video = video != undefined ? video : partners.video
            partners.location = location != undefined ? location : partners.location
            partners.phone_number1 = phone_number1 != undefined ? phone_number1 : partners.phone_number1
            partners.phone_number2 = phone_number2 != undefined ? phone_number2 : partners.phone_number2
            partners.telegram_link = telegram_link != undefined ? telegram_link : partners.telegram_link
            partners.facebook_link = facebook_link != undefined ? facebook_link : partners.facebook_link
            partners.instagram_link = instagram_link != undefined ? instagram_link : partners.instagram_link

            await AppDataSource.manager.save(partners)

            res.json({
                status: 200,
                message: "partners updated",
                data: partners
            })
        } catch (error) {
            console.log(error);
        }
    }

    public async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params

            const partners = await AppDataSource.getRepository(PartnersEntity).createQueryBuilder().delete().from(PartnersEntity).where({ id }).returning("*").execute()

            res.json({
                status: 200,
                message: "partners deleted",
                data: partners.raw[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default new PartnersController();