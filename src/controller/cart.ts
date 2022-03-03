import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 } from "cloudinary";
let cloudinary = v2;

import { Products } from "../entities/products";
import formidable from "formidable";
import { getRepository, In } from "typeorm";
import { Cart } from "../entities/cart";

export const createCart = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const cart = "";

    if (!cart) {
      res.status(401);
      throw new Error("cart Deleted");
    }

    res.json(cart);
  }
);
