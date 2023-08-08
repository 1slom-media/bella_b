import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { AparatEntity } from "./aparat"

@Entity({ name: "sample" })
export class SampleEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    name_uz: string

    @Column({ type: "varchar" })
    name_en: string

    @Column({ type: "varchar" })
    name_ru: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => AparatEntity, (aparat) => aparat.sample, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aparat: AparatEntity
}
