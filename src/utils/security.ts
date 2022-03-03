import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const signJwt = (payload: any) => {
  return jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];
    return prev;
  }, {});
};

export const AdminAndUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    Number(req.params.id) === Number(req.user.id) ||
    req.user.role === "Admin"
  ) {
    next();
  } else {
    return res.status(403).json("Not Allowed");
  }
};

export const AdminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json("FOR ADMINS ONLY");
  }
};
