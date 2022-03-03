import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { Shared } from "./shared";
import { Products } from "./products";
import { TheUser } from "./user";

@Entity("TheOrder")
export class TheOrder extends Shared {
  @Column()
  orderId: string;

  @Column()
  totalAmount: number;

  @Column()
  orderDate: Date;

  @Column()
  paidThrough: string;

  @Column()
  paymentResponse: string;

  @Column("simple-array")
  units: any;

  @Column({ default: "pending" })
  status: string;

  @OneToMany(() => Products, (product) => product.allOrders, { cascade: true })
  products: Products[];

  @OneToMany(() => TheUser, (user) => user.allOrders, {
    cascade: true,
  })
  user: TheUser[];
}
