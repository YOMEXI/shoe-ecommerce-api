"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheOrder = void 0;
const typeorm_1 = require("typeorm");
const shared_1 = require("./shared");
const products_1 = require("./products");
const user_1 = require("./user");
let TheOrder = class TheOrder extends shared_1.Shared {
    orderId;
    totalAmount;
    orderDate;
    paidThrough;
    paymentResponse;
    units;
    status;
    products;
    user;
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TheOrder.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], TheOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], TheOrder.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TheOrder.prototype, "paidThrough", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TheOrder.prototype, "paymentResponse", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array"),
    __metadata("design:type", Object)
], TheOrder.prototype, "units", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "pending" }),
    __metadata("design:type", String)
], TheOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_1.Products, (product) => product.allOrders, { cascade: true }),
    __metadata("design:type", Array)
], TheOrder.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_1.TheUser, (user) => user.allOrders, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], TheOrder.prototype, "user", void 0);
TheOrder = __decorate([
    (0, typeorm_1.Entity)("TheOrder")
], TheOrder);
exports.TheOrder = TheOrder;
//# sourceMappingURL=order.js.map