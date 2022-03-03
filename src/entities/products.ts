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
import { Cart } from "./cart";
import { TheOrder } from "./order";

@Entity("product")
export class Products extends Shared {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column("simple-array")
  categories: any[];

  @Column("simple-array")
  size: string[];

  @Column({ default: 0 })
  rating: number;

  @Column("simple-array")
  color: string[];

  @Column()
  price: number;

  @Column()
  imgUrl: string;

  @ManyToOne(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @ManyToOne(() => TheOrder, (order) => order.products)
  allOrders: TheOrder[];
}
