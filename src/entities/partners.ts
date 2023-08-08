import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm"
import { AparatEntity } from "./aparat"

@Entity({ name: "partners" })
export class PartnersEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    logo: string

    @Column({ type: "varchar" })
    name_uz: string

    @Column({ type: "varchar" })
    name_en: string

    @Column({ type: "varchar" })
    name_ru: string

    @Column({ type: "varchar" })
    description_uz: string

    @Column({ type: "varchar" })
    description_en: string

    @Column({ type: "varchar" })
    description_ru: string

    @Column({ type: "varchar" })
    image1: string

    @Column({ type: "varchar" })
    image2: string

    @Column({ type: "varchar" })
    image3: string

    @Column({ type: "varchar", nullable: true })
    video: string

    @Column({ type: "varchar", nullable: true })
    location: string

    @Column({ type: "varchar", nullable: true })
    phone_number1: string

    @Column({ type: "varchar", nullable: true })
    phone_number2: string

    @Column({ type: "varchar", nullable: true })
    telegram_link: string

    @Column({ type: "varchar", nullable: true })
    instagram_link: string

    @Column({ type: "varchar", nullable: true })
    facebook_link: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToMany(() => AparatEntity,(aparat)=>aparat.partners)
    aparat: AparatEntity[];
}
