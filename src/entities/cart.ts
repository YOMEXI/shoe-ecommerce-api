import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Shared } from "./shared";
import bcrypt from "bcrypt";
import { Products } from "./products";

@Entity("cart")
export class Cart extends Shared {
  @Column({ unique: true })
  userId: string;

  @Column()
  quantity: number;

  @OneToMany(() => Products, (product) => product.cart)
  product: Products[];
}
