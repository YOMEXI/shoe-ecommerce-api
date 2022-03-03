"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.authorize = exports.Login = exports.Register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cookie_1 = __importDefault(require("cookie"));
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const userDto_1 = require("../dto.ts/userDto");
const security_1 = require("../utils/security");
const user_1 = require("../entities/user");
exports.Register = (0, express_async_handler_1.default)(async (req, res, next) => {
    const customerInput = (0, class_transformer_1.plainToClass)(userDto_1.registerInputDto, req.body);
    const inputErrors = await (0, class_validator_1.validate)(customerInput, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        res.status(400).json((0, security_1.mapError)(inputErrors));
        throw new Error("Error");
    }
    const { username, imgUrl, firstname, lastname, address, phone, email, password, } = req.body;
    const userExist = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ email });
    if (userExist) {
        res.status(401);
        throw new Error("User Already Exists");
    }
    const user = await (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .insert()
        .into(user_1.TheUser)
        .values({
        username,
        firstname,
        lastname,
        email,
        phone,
        address,
        password: await bcrypt_1.default.hash(password, 11),
        imgUrl: "",
    })
        .execute();
    if (user)
        res.status(201).json({ msg: "User created please Login" });
});
exports.Login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const customerInput = (0, class_transformer_1.plainToClass)(userDto_1.userLoginDto, req.body);
    const inputErrors = await (0, class_validator_1.validate)(customerInput, {
        validationError: { target: true },
    });
    if (inputErrors.length > 0) {
        res.status(400).json((0, security_1.mapError)(inputErrors));
        throw new Error("Error");
    }
    //
    const { email, password } = req.body;
    const user = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("User Does not Exists");
    }
    const checkPassword = await bcrypt_1.default.compare(password, user.password);
    if (!checkPassword) {
        res.status(401);
        throw new Error("Incorrect email or password");
    }
    const { password: PASSWORD, ...others } = user;
    const { username, role, id, email: userMail } = user;
    let token = (0, security_1.signJwt)({ username, role, id, email: userMail });
    res.cookie("token", cookie_1.default.serialize("token", token, {
        httpOnly: process.env.NODE_ENV ? true : false,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
        maxAge: 360000,
        path: "/",
    }));
    res.status(200).json({
        message: "login successfull",
        user: others,
    });
});
exports.authorize = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    let finalToken;
    if (req.cookies) {
        token = req.cookies.token.split("=")[1];
        finalToken = token.split(";")[0];
    }
    if (!finalToken) {
        res.status(401);
        throw new Error("Please Log In  ....");
    }
    const { payload } = jsonwebtoken_1.default.verify(finalToken, process.env.JWT_SECRET);
    const { id } = payload;
    const stillTheUser = await (0, typeorm_1.getRepository)(user_1.TheUser).findOne({ id });
    if (!stillTheUser) {
        res.status(401);
        throw new Error("User No Longer Exist");
    }
    req.user = stillTheUser;
    next();
});
exports.logout = (0, express_async_handler_1.default)(async (req, res, next) => {
    res.set("Set-Cookie", cookie_1.default.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
    }));
    res.status(200).json({ success: true });
});
//# sourceMappingURL=auth.js.map