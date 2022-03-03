import express from "express";
import { authorize, Login, Register } from "../controller/auth";
import {
  loggedInUserDetails,
  singleUser,
  updateDetails,
} from "../controller/user";
import { AdminAndUser } from "../utils/security";

const router = express.Router();

router.get("/me", authorize, loggedInUserDetails);
router.get("/:id", authorize, singleUser);
router.put("/update/:id", authorize, AdminAndUser, updateDetails);

export { router as userRoute };
