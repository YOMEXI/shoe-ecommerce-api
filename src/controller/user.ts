import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import cookie from "cookie";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { AdminAndUser, mapError, signJwt } from "../utils/security";
import { TheUser } from "../entities/user";

export const updateDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
      username,
      firstname,
      lastname,
      email,
      currentPassword,
      newPassword,
      phone,
      address,
    } = req.body;

    const user = await getRepository(TheUser).findOne({ id });

    const isPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isPassword) {
      res.status(401);
      throw new Error("Password Invalid");
    }

    if (user) {
      let updated = await getRepository(TheUser).update(
        { id },
        {
          password: await bcrypt.hash(newPassword, 11),

          firstname,
          lastname,

          username,
        }
      );

      res.status(200).json(updated);
    } else {
      res.status(200).json("Wrong Details");
    }
  }
);

export const loggedInUserDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const user = await getRepository(TheUser).findOne({ id });

    if (!user) {
      res.status(401);
      throw new Error("User Deleted");
    }

    res.json(user);
  }
);

export const singleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await getRepository(TheUser).findOne({ id });

    if (!user) {
      res.status(401);
      throw new Error("User Deleted");
    }

    res.json(user);
  }
);
