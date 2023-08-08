import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { AparatEntity } from "./aparat";
import { PereparatEntity } from "./pereparat";

@Entity({ name: "description" })
export class DescriptionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    description_uz: string

    @Column({ type: "varchar" })
    description_en: string

    @Column({ type: "varchar" })
    description_ru: string

    @Column({ type: "varchar" })
    @IsString()
    youtube_link: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => AparatEntity, (aparat) => aparat.descriptions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aparat: AparatEntity

    @ManyToOne(() => PereparatEntity, (pereparat) => pereparat.descriptions, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    pereparat: PereparatEntity
}