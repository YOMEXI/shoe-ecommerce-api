import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 } from "cloudinary";
let cloudinary = v2;
import { Like } from "typeorm";
import { Products } from "../entities/products";
import formidable from "formidable";
import { getRepository, In } from "typeorm";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err: any, fields: any, files: any) => {
      const { title, description, categories, size, color, price, imgUrl } =
        fields;
      const { image } = files;
      const newProduct = new Products();
      newProduct.title = title;
      newProduct.description = description;
      newProduct.price = price;
      newProduct.categories = categories;
      (newProduct.size = size), (newProduct.color = color);
      newProduct.imgUrl = "";
      //
      const results = await getRepository(Products).save(newProduct);
      //
      if (image) {
        const product = await getRepository(Products).findOne({
          id: results.id,
        });
        cloudinary.uploader.upload(
          image.filepath,
          {
            resource_type: "auto",
            public_id: `product/${image.filepath}`,
            overwrite: true,
          },
          async function (error, result) {
            const products = await getRepository(Products).update(
              { id: product.id },
              {
                imgUrl: result.url,
              }
            );
            return res.status(200).json({ products, msg: "Product Created" });
          }
        );
      } else {
        await getRepository(Products).save(newProduct);
        res.status(200).json({ newProduct, msg: "Product Created" });
      }
    });
  }
);

export const allProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const qNew = req.query.new;
    const qCategory = req.query.categories as any;
    const currentPage = (req.query.page || 0) as number;
    const postPerPage = (req.query.count || 3) as number;

    //
    if (!qCategory) {
      const product = await getRepository(Products).find({
        order: { createdAt: "DESC" },
        skip: currentPage * postPerPage,
        take: postPerPage,
      });
      res.status(200).json(product);
    } else {
      const product = await getRepository(Products).find({
        categories: In([qCategory]),
      });
      res.status(200).json(product);
    }
  }
);

export const singleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await getRepository(Products).findOne({ id });

    if (!product) {
      res.status(401);
      throw new Error("product Deleted");
    }

    res.json(product);
  }
);

export const Search = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { searchText } = req.params;

    if (searchText.length === 0) return;

    let Pattern = new RegExp(`^${searchText}`);

    // const results = await getRepository(Products).find({
    //   title: Like(`%${searchText}%`),
    // });

    const results = await getRepository(Products)
      .createQueryBuilder()
      .where(
        `(LOWER(title) like '%${searchText}%' or LOWER(color) like '%${searchText}%' 
     )`
      )

      .getMany();

    // const resultToBeSent =
    //   results.length > 0 &&
    //   results.filter((result: any) => String(result._id) !== String(_id));

    res.status(200).json(results);
  }
);
