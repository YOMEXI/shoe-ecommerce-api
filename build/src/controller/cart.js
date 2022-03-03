"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = require("cloudinary");
let cloudinary = cloudinary_1.v2;
exports.createCart = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const cart = "";
    if (!cart) {
        res.status(401);
        throw new Error("cart Deleted");
    }
    res.json(cart);
});
//# sourceMappingURL=cart.js.map