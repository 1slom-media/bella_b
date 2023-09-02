import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { CategoryApparatEntity } from "./category_apparat";
import { CategoryPereparatEntity } from "./category_pereparat";
import { PereparatEntity } from "./pereparat";
import { AparatEntity } from "./aparat";
import { CategoryCosmeticsEntity } from "./category_cosmetic";
import { CosmeticsEntity } from "./cosmetics";

@Entity({ name: "company" })
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    name: string

    @Column({ type: "varchar" })
    @IsString()
    image: string

    @Column({ type: "varchar" })
    @IsString()
    title_uz: string

    @Column({ type: "varchar" })
    @IsString()
    title_ru: string

    @Column({ type: "varchar" })
    @IsString()
    title_en: string

    @Column({ type: "varchar" })
    @IsString()
    description_uz: string

    @Column({ type: "varchar" })
    @IsString()
    description_ru: string

    @Column({ type: "varchar" })
    @IsString()
    description_en: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>CategoryApparatEntity,(category_apparat)=>category_apparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    category_apparat:CategoryApparatEntity[]

    @OneToMany(()=>CategoryPereparatEntity,(category_pereparat)=>category_pereparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    category_pereparat:CategoryPereparatEntity[]

    @OneToMany(()=>CategoryCosmeticsEntity,(category_cosmetics)=>category_cosmetics.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    category_cosmetics:CategoryCosmeticsEntity[]

    @OneToMany(()=>PereparatEntity,(pereparat)=>pereparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    pereparat:PereparatEntity[]

    @OneToMany(()=>CosmeticsEntity,(cosmetics)=>cosmetics.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    cosmetics:CosmeticsEntity[]

    @OneToMany(()=>AparatEntity,(aparat)=>aparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    aparat:AparatEntity[]
}