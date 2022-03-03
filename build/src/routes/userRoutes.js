"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const user_1 = require("../controller/user");
const security_1 = require("../utils/security");
const router = express_1.default.Router();
exports.userRoute = router;
router.get("/me", auth_1.authorize, user_1.loggedInUserDetails);
router.get("/:id", auth_1.authorize, user_1.singleUser);
router.put("/update/:id", auth_1.authorize, security_1.AdminAndUser, user_1.updateDetails);
//# sourceMappingURL=userRoutes.js.map