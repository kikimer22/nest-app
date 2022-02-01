import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  uid: string;

  @Column({ default: false })
  isActive: boolean;
}
