import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { CompanyEntity } from "./company"
import { CategoryApparatEntity } from "./category_apparat"
import { PartnersEntity } from "./partners"
import { DescriptionEntity } from "./descriptions"
import { SampleEntity } from "./sample"
import { PhotosEntity } from "./photos"
import { DesignEntity } from "./design"
import { ParametrEntity } from "./parametr"

@Entity({ name: "aparat" })
export class AparatEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name_uz: string

    @Column({ type: "varchar" })
    name_en: string

    @Column({ type: "varchar" })
    name_ru: string

    @Column({ type: "varchar" })
    description_uz: string

    @Column({ type: "varchar" })
    description_en: string

    @Column({ type: "varchar" })
    description_ru: string

    @Column({ type: "varchar" })
    image1: string

    @Column({ type: "varchar" })
    image2: string

    @Column({ type: "varchar" })
    image3: string

    @Column({ type: "varchar", nullable: true })
    pdf: string

    @Column({ type: "text", nullable: true })
    product_benefits: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => CompanyEntity, (company) => company.aparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    company: CompanyEntity

    @ManyToOne(() => CategoryApparatEntity, (category_aparat) => category_aparat.aparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    category_aparat: CategoryApparatEntity

    @OneToMany(()=>DescriptionEntity,(descriptions)=>descriptions.aparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    descriptions:DescriptionEntity[]

    @OneToMany(()=>SampleEntity,(sample)=>sample.aparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    sample:SampleEntity[]

    @OneToMany(()=>PhotosEntity,(photos)=>photos.aparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    photos:PhotosEntity[]

    @OneToMany(()=>DesignEntity,(design)=>design.aparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    design:DesignEntity[]

    @OneToMany(()=>ParametrEntity,(parametr)=>parametr.aparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    parametr:ParametrEntity[]

    @ManyToMany(() => PartnersEntity,(partners)=>partners.aparat)
    @JoinTable()
    partners: PartnersEntity[];
}
