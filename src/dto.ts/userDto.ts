import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class registerInputDto {
  @IsNotEmpty()
  @Length(2, 20, { message: "name should be more than two word" })
  username: string;

  @IsNotEmpty()
  @Length(2, 20, { message: "phone should be more than two digits" })
  phone: string;

  @IsNotEmpty()
  @Length(2, 600)
  address: string;

  @IsEmail()
  email: string;

  imgUrl: string;

  @IsNotEmpty()
  @Length(7, 20)
  password: string;

  @IsNotEmpty()
  @Length(2, 200)
  lastname: string;

  @IsNotEmpty()
  @Length(2, 200)
  firstname: string;

  role?: any;
}

export class userLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(7, 20)
  password: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface vendorPayloadDto {
  name: string;
  foodType: string[];
  id: string | number;
  email: string;
}

export interface EditVendorInfoDto {
  name: string;
  productType: string[];
  address: string;
  serviceAvailabe?: boolean;
  email: string;
}

export interface createFoodDto {
  name: string;
  foodType: string;
  description: string;
  serviceAvailabe?: boolean;
  readyTime?: number;
  price: number;
  category: string;
  rating: number;
}
