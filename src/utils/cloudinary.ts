import { v2 } from "cloudinary";
import { Request, Response } from "express";
import formidable from "formidable";
import { getRepository } from "typeorm";
import { Product } from "../entities/product";
let cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const multiImageUpload = async (
  result,
  image,
  req: Request,
  res: Response
) => {
  const product = await getRepository(Product).findOne({ id: result.id });

  if (result && image) {
    cloudinary.uploader.upload(
      image.filepath,
      {
        resource_type: "auto",
        public_id: `product/${image.filepath}`,
        overwrite: true,
      },
      async function (error, result: any) {
        const done = await getRepository(Product).update(
          { id: result.id },
          {
            imgUrl: result.url,
          }
        );

        res.status(200).json(done);
      }
    );
  }
};
