import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Review } from "./Review";

@Entity("hosts")
export class Host extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    user_id: number;

    @Column("text")
    name: string;

    @Column("text")
    country: string;

    @Column("text")
    city: string;

    @Column("text")
    address: string;

    @Column("text")
    comment: string;

    @Column("text")
    images: string | string[];

    @Column("int") 
    price: number;

    @Column("int") 
    beds: number;
  
    @Column("text", { default: null })
    postalcode: string;
  
    @Column("text", { array: true })
    amenities: string[];

    @OneToMany(() => Review, review => review.user_id)
    reviews: Review[];

    @Column("text", { array: true })
    tags: string[];

    @Column("bool", { default: false })
    isAuth: boolean;
}
