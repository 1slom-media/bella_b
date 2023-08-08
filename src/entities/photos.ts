import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { AparatEntity } from "./aparat"

@Entity({ name: "photos" })
export class PhotosEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    image1: string

    @Column({ type: "varchar" })
    image2: string

    @Column({ type: "varchar" })
    image3: string

    @Column({ type: "varchar" })
    image4: string

    @Column({ type: "varchar" })
    video: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => AparatEntity, (aparat) => aparat.photos, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aparat: AparatEntity
}
