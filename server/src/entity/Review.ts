import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Review extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    user_id: number;

    @Column("text")
    name: string;

    @Column("text")
    text: string;

    @Column("int")
    star: number;
}
