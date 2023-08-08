import { AppDataSource } from "../data-source";
import { NewsEntity } from "../entities/news";


export async function updateStatus() {
    const newsList = await AppDataSource.getRepository(NewsEntity).find();

    newsList.forEach(async news => {
        const currentTime = new Date();
        try {
            if (news.time_date.getTime() <= currentTime.getTime()) {
                await AppDataSource.getRepository(NewsEntity).createQueryBuilder().update(NewsEntity)
                    .set({ status: "conducted" })
                    .where({ status: "not_conducted", id: news.id })
                    .returning("*")
                    .execute()
            }
        } catch (error) {
            console.log(error);
        }
    });
}
