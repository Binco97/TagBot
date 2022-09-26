import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Group } from "./Group";


@Entity()
export class Admin extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 25, nullable: false, unique: true})
    userId: number;

    //Many to many relationship with the Group entity
    @ManyToOne(() => Group, group => group.admins, {onDelete: "CASCADE"})
    groups: Group;

}