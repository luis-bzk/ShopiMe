export type IValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IValidType = "shirts" | "pants" | "hoodies" | "hats";
export type IValidGender = "men" | "women" | "kid" | "unisex";

export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IValidSize[];
  slug: string;
  tags: string[];
  title: string;
  type: IValidType;
  gender: IValidGender;

  // TODO: createdAt & updatedAt
  createdAt: string;
  updatedAt: string;
}
