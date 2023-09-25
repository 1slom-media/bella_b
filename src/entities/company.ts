import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { PereparatEntity } from "./pereparat";
import { AparatEntity } from "./aparat";
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

    @OneToMany(()=>PereparatEntity,(pereparat)=>pereparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    pereparat:PereparatEntity[]

    @OneToMany(()=>CosmeticsEntity,(cosmetics)=>cosmetics.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    cosmetics:CosmeticsEntity[]

    @OneToMany(()=>AparatEntity,(aparat)=>aparat.company,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    aparat:AparatEntity[]
}