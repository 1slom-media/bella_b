import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { NewsFormEntity } from "./news_form";

@Entity({ name: "news" })
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    @IsString()
    image: string;

    @Column({ type: "varchar" })
    @IsString()
    title_uz: string;

    @Column({ type: "varchar" })
    @IsString()
    title_ru: string;

    @Column({ type: "varchar" })
    @IsString()
    title_en: string;

    @Column({ type: "varchar" })
    @IsString()
    description_uz: string;

    @Column({ type: "varchar" })
    @IsString()
    description_ru: string;

    @Column({ type: "varchar" })
    @IsString()
    description_en: string;

    @Column({ type: "varchar", default: "not_conducted" })
    @IsString()
    status: string;

    @Column({ type: "timestamp" })
    time_date: Date;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(()=>NewsFormEntity,(news_form)=>news_form.news,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    news_form:NewsFormEntity[]
}