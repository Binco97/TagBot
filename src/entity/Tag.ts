import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne, Unique, JoinTable } from "typeorm";
import { Group } from "./Group";
import { Subscriber } from "./Subscriber";


@Entity()
@Unique(['name', 'group'])
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    name: string;

    @Column({type: 'datetime', nullable: true})
    lastTagged: Date;

    @Column({type: 'varchar', length: 25, nullable: false, default: '0'})
    creatorId: number;

    @ManyToOne(() => Group, (group) => group.tags, { onDelete: 'CASCADE' })
    group: Group;

    //many to many with subscriber
    @ManyToMany(() => Subscriber, (subscriber) => subscriber.tags, { onDelete: 'CASCADE' })
    @JoinTable()
    subscribers: Subscriber[];
}