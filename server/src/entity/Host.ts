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
  
    @Column("int") 
    guests: number;
  
    @Column("double precision")
    latitude: number;
  
    @Column("double precision") 
    longitude: number;
  
    @Column("text", { array: true })
    amenities: string[];

    @OneToMany(() => Review, review => review.user_id)
    reviews: Review[];

    @Column("text", { array: true })
    tags: string[];
}
