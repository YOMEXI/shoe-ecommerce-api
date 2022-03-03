"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const order_1 = require("../controller/order");
const router = express_1.default.Router();
exports.orderRoute = router;
router.post("/create", auth_1.authorize, order_1.createOrder);
router.post("/orderId", auth_1.authorize, order_1.paypalOrderId);
router.post("/onApprove/:orderId", auth_1.authorize, order_1.onApprove);
router.get("/paypal", auth_1.authorize, order_1.paypalId);
router.get("/", auth_1.authorize, order_1.userOrders);
//# sourceMappingURL=orderRoutes.js.map