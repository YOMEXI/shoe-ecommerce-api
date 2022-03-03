"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const product_1 = require("../controller/product");
const security_1 = require("../utils/security");
const router = express_1.default.Router();
exports.productRoute = router;
router.post("/create", auth_1.authorize, security_1.AdminOnly, product_1.createProduct);
router.get("/", product_1.allProducts);
router.post("/search/:searchText", product_1.Search);
router.get("/:id", product_1.singleProduct);
//# sourceMappingURL=productRoutes.js.map