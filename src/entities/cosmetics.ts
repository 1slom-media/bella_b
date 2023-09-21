import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { CompanyEntity } from "./company"
import { CategoryPereparatEntity } from "./category_pereparat"
import { DescriptionEntity } from "./descriptions"
import { CategoryCosmeticsEntity } from "./category_cosmetic"

@Entity({ name: "cosmetics" })
export class CosmeticsEntity {

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

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => CompanyEntity, (company) => company.cosmetics, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    company: CompanyEntity

    @ManyToOne(() => CategoryCosmeticsEntity  , (category_cosmetics) => category_cosmetics.cosmetics, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    category_cosmetics: CategoryCosmeticsEntity  

    @OneToMany(()=>DescriptionEntity,(descriptions)=>descriptions.cosmetics,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    descriptions:DescriptionEntity[]

}
