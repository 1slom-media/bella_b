import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { NewsEntity } from "./news";

@Entity({ name: "news_form" })
export class NewsFormEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 100 })
    @IsString()
    full_name: string

    @Column({ type: "varchar" })
    activity: string;

    @Column({ type: "varchar" })
    position: string;

    @Column({ type: "varchar" })
    clinic_name: string;

    @Column({ type: "varchar" })
    phone: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => NewsEntity, (news) => news.news_form, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    news: NewsEntity

}