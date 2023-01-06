import { IValidGender, IValidSize, IValidType } from "./products";

export interface ICartProduct {
  _id: string;
  title: string;
  size?: IValidSize;
  gender: IValidGender;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  // inStock: number;
}
