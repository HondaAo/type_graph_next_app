import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from "typeorm";
  import { User } from "./User";
  import { Host } from "./Host";
  
  @Entity("messages")
  export class Message extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number;
  
    @Column("text") 
    text: string;
  
    @Column("int") 
    userId: number;
  
    @ManyToOne(() => User)
    user: User;
  
    @Column("int") 
    host_id: number;
  
    @ManyToOne(() => Host)
    host: Host;
  }