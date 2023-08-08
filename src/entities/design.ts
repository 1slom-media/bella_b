import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { AparatEntity } from "./aparat"

@Entity({ name: "design" })
export class DesignEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    before: string

    @Column({ type: "varchar" })
    after: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;

    @ManyToOne(() => AparatEntity, (aparat) => aparat.design, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    aparat: AparatEntity
}
