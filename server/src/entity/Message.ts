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
    @PrimaryGeneratedColumn("uuid") id: string;
  
    @Column("text") text: string;
  
    @Column("uuid") userId: string;
  
    @ManyToOne(() => User)
    user: User;
  
    @Column("uuid") host_id: string;
  
    @ManyToOne(() => Host)
    host: Host;
  }