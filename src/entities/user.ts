import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Shared } from "./shared";
import bcrypt from "bcrypt";
import { TheOrder } from "./order";

@Entity("TheUser")
export class TheUser extends Shared {
  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  address: string;

  @Column({ default: "user" })
  role: string;

  @Column()
  phone: string;

  @Column()
  imgUrl: string;

  @ManyToOne(() => TheOrder, (order) => order.user)
  allOrders: TheOrder[];
}
