"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
exports.authRoute = router;
router.post("/register", auth_1.Register);
router.post("/login", auth_1.Login);
router.get("/logout", auth_1.logout);
//# sourceMappingURL=authRoute.js.map