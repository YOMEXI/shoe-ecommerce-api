"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = exports.singleProduct = exports.allProducts = exports.createProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cloudinary_1 = require("cloudinary");
let cloudinary = cloudinary_1.v2;
const products_1 = require("../entities/products");
const formidable_1 = __importDefault(require("formidable"));
const typeorm_1 = require("typeorm");
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.createProduct = (0, express_async_handler_1.default)(async (req, res, next) => {
    const form = (0, formidable_1.default)({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        const { title, description, categories, size, color, price, imgUrl } = fields;
        const { image } = files;
        const newProduct = new products_1.Products();
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.categories = categories;
        (newProduct.size = size), (newProduct.color = color);
        newProduct.imgUrl = "";
        //
        const results = await (0, typeorm_1.getRepository)(products_1.Products).save(newProduct);
        //
        if (image) {
            const product = await (0, typeorm_1.getRepository)(products_1.Products).findOne({
                id: results.id,
            });
            cloudinary.uploader.upload(image.filepath, {
                resource_type: "auto",
                public_id: `product/${image.filepath}`,
                overwrite: true,
            }, async function (error, result) {
                const products = await (0, typeorm_1.getRepository)(products_1.Products).update({ id: product.id }, {
                    imgUrl: result.url,
                });
                return res.status(200).json({ products, msg: "Product Created" });
            });
        }
        else {
            await (0, typeorm_1.getRepository)(products_1.Products).save(newProduct);
            res.status(200).json({ newProduct, msg: "Product Created" });
        }
    });
});
exports.allProducts = (0, express_async_handler_1.default)(async (req, res, next) => {
    const qNew = req.query.new;
    const qCategory = req.query.categories;
    const currentPage = (req.query.page || 0);
    const postPerPage = (req.query.count || 3);
    //
    if (!qCategory) {
        const product = await (0, typeorm_1.getRepository)(products_1.Products).find({
            order: { createdAt: "DESC" },
            skip: currentPage * postPerPage,
            take: postPerPage,
        });
        res.status(200).json(product);
    }
    else {
        const product = await (0, typeorm_1.getRepository)(products_1.Products).find({
            categories: (0, typeorm_1.In)([qCategory]),
        });
        res.status(200).json(product);
    }
});
exports.singleProduct = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const product = await (0, typeorm_1.getRepository)(products_1.Products).findOne({ id });
    if (!product) {
        res.status(401);
        throw new Error("product Deleted");
    }
    res.json(product);
});
exports.Search = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { searchText } = req.params;
    if (searchText.length === 0)
        return;
    let Pattern = new RegExp(`^${searchText}`);
    // const results = await getRepository(Products).find({
    //   title: Like(`%${searchText}%`),
    // });
    const results = await (0, typeorm_1.getRepository)(products_1.Products)
        .createQueryBuilder()
        .where(`(LOWER(title) like '%${searchText}%' or LOWER(color) like '%${searchText}%' 
     )`)
        .getMany();
    // const resultToBeSent =
    //   results.length > 0 &&
    //   results.filter((result: any) => String(result._id) !== String(_id));
    res.status(200).json(results);
});
//# sourceMappingURL=product.js.map