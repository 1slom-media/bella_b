import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { CompanyEntity } from "./company"
import { CategoryPereparatEntity } from "./category_pereparat"
import { DescriptionEntity } from "./descriptions"

@Entity({ name: "pereparat" })
export class PereparatEntity {

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

    @ManyToOne(() => CompanyEntity, (company) => company.pereparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    company: CompanyEntity

    @ManyToOne(() => CategoryPereparatEntity  , (category_pereparat) => category_pereparat.pereparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    category_pereparat: CategoryPereparatEntity  

    @OneToMany(()=>DescriptionEntity,(descriptions)=>descriptions.pereparat,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    descriptions:DescriptionEntity[]

}
