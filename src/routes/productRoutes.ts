import express from "express";
import { authorize, Login, Register } from "../controller/auth";
import {
  allProducts,
  createProduct,
  Search,
  singleProduct,
} from "../controller/product";
import {
  loggedInUserDetails,
  singleUser,
  updateDetails,
} from "../controller/user";
import { AdminAndUser, AdminOnly } from "../utils/security";

const router = express.Router();

router.post("/create", authorize, AdminOnly, createProduct);
router.get("/", allProducts);
router.post("/search/:searchText", Search);
router.get("/:id", singleProduct);

export { router as productRoute };
