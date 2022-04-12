import cookieParser = require("cookie-parser");
import cors = require("cors");
import { Application, NextFunction, Request, Response } from "express";
import express = require("express");
import helmet from "helmet";
import morgan = require("morgan");
import { authRoute } from "./routes/authRoute";
import { cartRoute } from "./routes/cartRoutes";
import { orderRoute } from "./routes/orderRoutes";
import { productRoute } from "./routes/productRoutes";
import { userRoute } from "./routes/userRoutes";

import { errorhandler } from "./utils/errorHandler";

// create and setup express app
const app: Application = express();
app.use(express.json());

// register routes

app.use(helmet());
app.use(morgan("dev"));

app.use(cookieParser());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.NODE_ENV === "development"
      ? "*"
      : process.env.CorsAllowedWebsite
  );
  next();
});

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  throw new Error(`The url ${req.originalUrl} doesnt exist`);
  next();
});

app.use(errorhandler);

// start express server
export default app;
