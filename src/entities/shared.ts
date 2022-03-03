import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class Shared {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
