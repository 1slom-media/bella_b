import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { AparatEntity } from "./aparat";

@Entity({ name: "parametr" })
export class ParametrEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    @IsString()
    parametr_uz: string

    @Column({ type: "varchar" })
    @IsString()
    parametr_ru: string

    @Column({ type: "varchar" })
    @IsString()
    parametr_en: string

    @Column({ type: "varchar" })
    @IsString()
    information_uz: string

    @Column({ type: "varchar" })
    @IsString()
    information_ru: string

    @Column({ type: "varchar" })
    @IsString()
    information_en: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(()=>AparatEntity,(aparat)=>aparat.parametr,{onDelete:"CASCADE",onUpdate:"CASCADE"})
    aparat:AparatEntity
}