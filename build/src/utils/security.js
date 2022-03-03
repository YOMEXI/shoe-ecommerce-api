"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOnly = exports.AdminAndUser = exports.mapError = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload) => {
    return jsonwebtoken_1.default.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
};
exports.signJwt = signJwt;
const mapError = (errors) => {
    return errors.reduce((prev, err) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {});
};
exports.mapError = mapError;
const AdminAndUser = (req, res, next) => {
    if (Number(req.params.id) === Number(req.user.id) ||
        req.user.role === "Admin") {
        next();
    }
    else {
        return res.status(403).json("Not Allowed");
    }
};
exports.AdminAndUser = AdminAndUser;
const AdminOnly = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    }
    else {
        return res.status(403).json("FOR ADMINS ONLY");
    }
};
exports.AdminOnly = AdminOnly;
//# sourceMappingURL=security.js.map