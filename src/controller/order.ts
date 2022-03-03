import e, { NextFunction, Request, Response } from "express";
import paypal from "@paypal/checkout-server-sdk";

import asyncHandler from "express-async-handler";
import { v2 } from "cloudinary";
let cloudinary = v2;

import { Products } from "../entities/products";
import formidable from "formidable";
import { createQueryBuilder, getConnection, getRepository, In } from "typeorm";
import { Cart } from "../entities/cart";
import { orderDto } from "../dto.ts/orderDto";
import { TheOrder } from "../entities/order";
import { TheUser } from "../entities/user";

let environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_ClientId,
  process.env.PAYPAL_Secret
);
let client = new paypal.core.PayPalHttpClient(environment);

export const createOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.user;
    const { orderId } = req.body;

    if (id) {
      const orderId = `${Math.floor(Math.random() * 89000 * 1000)}`;
      let profile = await getRepository(TheUser).findOne({
        id,
      });

      let cart: any = <orderDto>req.body.c;

      let ID = cart.map((c: any) => {
        return c.id;
      });
      let cartItem = [];
      let netAmount = 0;
      const product = await getRepository(Products).find({
        id: In([...ID]),
      });

      product.map((products: any) =>
        cart.map(({ id, quantity }) => {
          if (Number(products.id) === Number(id)) {
            netAmount += products.price * quantity;
            cartItem.push(products);
          }
        })
      );

      if (product) {
        const order = new TheOrder();
        order.orderId = orderId;

        order.paidThrough = "paypal";
        order.paymentResponse = "unpaid";
        order.status = "waiting";
        order.orderDate = new Date();
        order.totalAmount = netAmount;
        order.units = cart.map(({ id, quantity }) => {
          return quantity;
        });
        order.products = cartItem;
        order.user = [profile];
        await getRepository(TheOrder).save(order);
        return res.json({ order });
      }
    }
  }
);

export const paypalId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ clientId: process.env.PAYPAL_ClientId });
  }
);

export const paypalOrderId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let request: any = new paypal.orders.OrdersCreateRequest();

    const total = req.body.cartTotalAmount;

    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
            },
            description: "This is the payment description.",
          },
        },
      ],
    });

    try {
      const order = await client.execute(request);

      return res.json({ orderId: order.result.id });
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  }
);

export const userOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    let userId;

    const order = await getRepository(TheOrder)
      .createQueryBuilder("order")
      .innerJoinAndSelect("order.user", "user")
      .innerJoinAndSelect("order.products", "products")
      .where("user.id = :id", { id: id })
      .getMany();

    res.status(200).json(order);
  }
);

export const onApprove = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await getRepository(TheOrder).update(
      { orderId },
      { paymentResponse: "paid" }
    );
    res.status(200).json({ msg: "payment successful" });
  }
);
