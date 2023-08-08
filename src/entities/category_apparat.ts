import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { CompanyEntity } from "./company";
import { AparatEntity } from "./aparat";


@Entity({ name: "category_apparat" })
export class CategoryApparatEntity {
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

    @ManyToOne(() => CompanyEntity, (company) => company.category_apparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    company: CompanyEntity

    @OneToMany(() => AparatEntity, (aparat) => aparat.category_aparat, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aparat: AparatEntity[]
}
