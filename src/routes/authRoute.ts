import express from "express";
import { Login, logout, Register } from "../controller/auth";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", logout);

export { router as authRoute };
