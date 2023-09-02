import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { CompanyEntity } from "./company";
import { PereparatEntity } from "./pereparat";
import { CosmeticsEntity } from "./cosmetics";


@Entity({ name: "category_cosmetics" })
export class CategoryCosmeticsEntity {
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

    @ManyToOne(() => CompanyEntity, (company) => company.category_cosmetics, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    company: CompanyEntity

    @OneToMany(() => CosmeticsEntity, (cosmetics) => cosmetics.category_cosmetics, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    cosmetics: CosmeticsEntity[]
}
