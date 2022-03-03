"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT;
try {
    (0, typeorm_1.createConnection)();
    console.log("DB cleanly connected");
}
catch (error) {
    console.log(error);
}
app_1.default.listen(port, async () => {
    console.log(`app running on port ${port}`);
});
//# sourceMappingURL=server.js.map