import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { PereparatEntity } from "./pereparat";


@Entity({ name: "category_pereparat" })
export class CategoryPereparatEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    title_uz: string

    @Column({ type: "varchar" })
    @IsString()
    title_en: string

    @Column({ type: "varchar" })
    @IsString()
    title_ru: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @OneToMany(() => PereparatEntity, (pereparat) => pereparat.category_pereparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    pereparat: PereparatEntity[]
}
