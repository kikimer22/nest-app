import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostEnt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  authorUid: string;

  @Column({ nullable: true })
  date: Date;
}
