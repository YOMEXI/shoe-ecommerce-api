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
exports.userLoginDto = exports.registerInputDto = void 0;
const class_validator_1 = require("class-validator");
class registerInputDto {
    username;
    phone;
    address;
    email;
    imgUrl;
    password;
    lastname;
    firstname;
    role;
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 20, { message: "name should be more than two word" }),
    __metadata("design:type", String)
], registerInputDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 20, { message: "phone should be more than two digits" }),
    __metadata("design:type", String)
], registerInputDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 600),
    __metadata("design:type", String)
], registerInputDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], registerInputDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(7, 20),
    __metadata("design:type", String)
], registerInputDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 200),
    __metadata("design:type", String)
], registerInputDto.prototype, "lastname", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 200),
    __metadata("design:type", String)
], registerInputDto.prototype, "firstname", void 0);
exports.registerInputDto = registerInputDto;
class userLoginDto {
    email;
    password;
}
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], userLoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(7, 20),
    __metadata("design:type", String)
], userLoginDto.prototype, "password", void 0);
exports.userLoginDto = userLoginDto;
//# sourceMappingURL=userDto.js.map