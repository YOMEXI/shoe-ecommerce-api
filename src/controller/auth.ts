import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import cookie from "cookie";
import { getConnection, getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { registerInputDto, userLoginDto } from "../dto.ts/userDto";
import { mapError, signJwt } from "../utils/security";
import { TheUser } from "../entities/user";

export const Register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerInput = plainToClass(registerInputDto, req.body);

    const inputErrors = await validate(customerInput, {
      validationError: { target: true },
    });

    if (inputErrors.length > 0) {
      res.status(400).json(mapError(inputErrors));
      throw new Error("Error");
    }

    const {
      username,
      imgUrl,
      firstname,
      lastname,
      address,
      phone,
      email,
      password,
    } = <registerInputDto>req.body;

    const userExist = await getRepository(TheUser).findOne({ email });
    if (userExist) {
      res.status(401);
      throw new Error("User Already Exists");
    }

    const user = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(TheUser)
      .values({
        username,
        firstname,
        lastname,
        email,
        phone,
        address,
        password: await bcrypt.hash(password, 11),
        imgUrl: "",
      })
      .execute();

    if (user) res.status(201).json({ msg: "User created please Login" });
  }
);

export const Login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const customerInput = plainToClass(userLoginDto, req.body);

    const inputErrors = await validate(customerInput, {
      validationError: { target: true },
    });

    if (inputErrors.length > 0) {
      res.status(400).json(mapError(inputErrors));
      throw new Error("Error");
    }

    //
    const { email, password } = <userLoginDto>req.body;
    const user = await getRepository(TheUser).findOne({ email });
    if (!user) {
      res.status(400);

      throw new Error("User Does not Exists");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(401);
      throw new Error("Incorrect email or password");
    }

    const { password: PASSWORD, ...others } = user;
    const { username, role, id, email: userMail } = user;

    let token = signJwt({ username, role, id, email: userMail });

    res.cookie(
      "token",
      cookie.serialize("token", token, {
        httpOnly: process.env.NODE_ENV ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
        maxAge: 360000,
        path: "/",
      })
    );

    res.status(200).json({
      message: "login successfull",
      user: others,
    });
  }
);

export const authorize = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    let finalToken: string;

    if (req.cookies) {
      token = req.cookies.token.split("=")[1];
      finalToken = token.split(";")[0];
    }

    if (!finalToken) {
      res.status(401);
      throw new Error("Please Log In  ....");
    }
    const { payload }: any = jwt.verify(
      finalToken,
      process.env.JWT_SECRET
    ) as any;
    const { id } = payload;

    const stillTheUser = await getRepository(TheUser).findOne({ id });

    if (!stillTheUser) {
      res.status(401);
      throw new Error("User No Longer Exist");
    }

    req.user = stillTheUser;
    next();
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );

    res.status(200).json({ success: true });
  }
);
