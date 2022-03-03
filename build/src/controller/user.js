"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleUser = exports.loggedInUserDetails = exports.updateDetails = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../entities/user");
exports.updateDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const { username, firstname, lastname, email, currentPassword, newPassword, phone, address, } = req.body;
    const user = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ id });
    const isPassword = await bcrypt_1.default.compare(currentPassword, user.password);
    if (!isPassword) {
        res.status(401);
        throw new Error("Password Invalid");
    }
    if (user) {
        let updated = await (0, typeorm_1.getRepository)(user_1.TheUser).update({ id }, {
            password: await bcrypt_1.default.hash(newPassword, 11),
            firstname,
            lastname,
            username,
        });
        res.status(200).json(updated);
    }
    else {
        res.status(200).json("Wrong Details");
    }
});
exports.loggedInUserDetails = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.user;
    const user = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ id });
    if (!user) {
        res.status(401);
        throw new Error("User Deleted");
    }
    res.json(user);
});
exports.singleUser = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const user = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ id });
    if (!user) {
        res.status(401);
        throw new Error("User Deleted");
    }
    res.json(user);
});
//# sourceMappingURL=user.js.map