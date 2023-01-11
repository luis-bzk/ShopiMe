import { IValidGender, IValidSize, IValidType } from "./products";

export type TShippingAddressData = {
  name: string;
  lastname: string;
  address: string;
  address2?: string;
  zipcode: string;
  city: string;
  country: string;
  phone: string;
};

export interface IProductFormData {
  _id?: string;
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
}
