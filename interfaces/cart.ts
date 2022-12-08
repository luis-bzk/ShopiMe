import { IValidGender, IValidSize, IValidType } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  // inStock: number;
  price: number;
  size?: IValidSize;
  slug: string;
  title: string;
  gender: IValidGender;
  quantity: number;
}
