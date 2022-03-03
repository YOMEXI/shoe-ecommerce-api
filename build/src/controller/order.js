"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onApprove = exports.userOrders = exports.paypalOrderId = exports.paypalId = exports.createOrder = void 0;
const checkout_server_sdk_1 = __importDefault(require("@paypal/checkout-server-sdk"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = require("cloudinary");
let cloudinary = cloudinary_1.v2;
const products_1 = require("../entities/products");
const typeorm_1 = require("typeorm");
const order_1 = require("../entities/order");
const user_1 = require("../entities/user");
let environment = new checkout_server_sdk_1.default.core.SandboxEnvironment(process.env.PAYPAL_ClientId, process.env.PAYPAL_Secret);
let client = new checkout_server_sdk_1.default.core.PayPalHttpClient(environment);
exports.createOrder = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const { orderId } = req.body;
    if (id) {
        const orderId = `${Math.floor(Math.random() * 89000 * 1000)}`;
        let profile = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({
            id,
        });
        let cart = req.body.c;
        let ID = cart.map((c) => {
            return c.id;
        });
        let cartItem = [];
        let netAmount = 0;
        const product = await (0, typeorm_1.getRepository)(products_1.Products).find({
            id: (0, typeorm_1.In)([...ID]),
        });
        product.map((products) => cart.map(({ id, quantity }) => {
            if (Number(products.id) === Number(id)) {
                netAmount += products.price * quantity;
                cartItem.push(products);
            }
        }));
        if (product) {
            const order = new order_1.TheOrder();
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
            await (0, typeorm_1.getRepository)(order_1.TheOrder).save(order);
            return res.json({ order });
        }
    }
});
exports.paypalId = (0, express_async_handler_1.default)(async (req, res, next) => {
    res.json({ clientId: process.env.PAYPAL_ClientId });
});
exports.paypalOrderId = (0, express_async_handler_1.default)(async (req, res, next) => {
    let request = new checkout_server_sdk_1.default.orders.OrdersCreateRequest();
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
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }
});
exports.userOrders = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    let userId;
    const order = await (0, typeorm_1.getRepository)(order_1.TheOrder)
        .createQueryBuilder("order")
        .innerJoinAndSelect("order.user", "user")
        .innerJoinAndSelect("order.products", "products")
        .where("user.id = :id", { id: id })
        .getMany();
    res.status(200).json(order);
});
exports.onApprove = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { orderId } = req.params;
    const order = await (0, typeorm_1.getRepository)(order_1.TheOrder).update({ orderId }, { paymentResponse: "paid" });
    res.status(200).json({ msg: "payment successful" });
});
//# sourceMappingURL=order.js.map