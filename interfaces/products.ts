export type IValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IValidType = "shirts" | "pants" | "hoodies" | "hats";
export type IValidGender = "men" | "women" | "kid" | "unisex";

export interface IProduct {
  _id: string;
  description: string;
  images: Array<string>;
  inStock: number;
  price: number;
  sizes: Array<IValidSize>;
  slug: string;
  tags: Array<string>;
  title: string;
  type: IValidType;
  gender: IValidGender;

  createdAt: string;
  updatedAt: string;
}
