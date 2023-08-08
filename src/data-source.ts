import "reflect-metadata"
import { DataSource } from "typeorm"
import { FormaAppEntity } from "./entities/application_form"
import { CompanyEntity } from "./entities/company"
import { SertificatEntity } from "./entities/sertificat"
import { NewsEntity } from "./entities/news"
import { CategoryApparatEntity } from "./entities/category_apparat"
import { CategoryPereparatEntity } from "./entities/category_pereparat"
import { NewsFormEntity } from "./entities/news_form"
import { AdminEntity } from "./entities/admin"
import { PartnersEntity } from "./entities/partners"
import { AparatEntity } from "./entities/aparat"
import { PereparatEntity } from "./entities/pereparat"
import { DescriptionEntity } from "./entities/descriptions"
import { SampleEntity } from "./entities/sample"
import { PhotosEntity } from "./entities/photos"
import { DesignEntity } from "./entities/design"
import { ParametrEntity } from "./entities/parametr"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "7hEfwjl*OVRL",
    database: "bella_b",
    synchronize: true,
    logging: false,
    entities: [FormaAppEntity,CompanyEntity,SertificatEntity,NewsEntity,CategoryApparatEntity,CategoryPereparatEntity,NewsFormEntity,AdminEntity,PartnersEntity,AparatEntity,PereparatEntity,DescriptionEntity,SampleEntity,PhotosEntity,DesignEntity,ParametrEntity],
    migrations: [],
    subscribers: [],
})
