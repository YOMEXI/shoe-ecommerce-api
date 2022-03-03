import express from "express";
import { authorize } from "../controller/auth";
import {
  createOrder,
  onApprove,
  paypalId,
  paypalOrderId,
  userOrders,
} from "../controller/order";

const router = express.Router();

router.post("/create", authorize, createOrder);
router.post("/orderId", authorize, paypalOrderId);
router.post("/onApprove/:orderId", authorize, onApprove);
router.get("/paypal", authorize, paypalId);
router.get("/", authorize, userOrders);

export { router as orderRoute };
