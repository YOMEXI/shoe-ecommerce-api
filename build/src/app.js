"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet_1 = __importDefault(require("helmet"));
const morgan = require("morgan");
const authRoute_1 = require("./routes/authRoute");
const cartRoutes_1 = require("./routes/cartRoutes");
const orderRoutes_1 = require("./routes/orderRoutes");
const productRoutes_1 = require("./routes/productRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const errorHandler_1 = require("./utils/errorHandler");
// create and setup express app
const app = express();
app.use(express.json());
// register routes
app.use((0, helmet_1.default)());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Set-Cookie"],
}));
app.use("/api/auth", authRoute_1.authRoute);
app.use("/api/user", userRoutes_1.userRoute);
app.use("/api/product", productRoutes_1.productRoute);
app.use("/api/order", orderRoutes_1.orderRoute);
app.use("/api/cart", cartRoutes_1.cartRoute);
app.use("*", (req, res, next) => {
    res.status(404);
    throw new Error(`The url ${req.originalUrl} doesnt exist`);
    next();
});
app.use(errorHandler_1.errorhandler);
// start express server
exports.default = app;
//# sourceMappingURL=app.js.map