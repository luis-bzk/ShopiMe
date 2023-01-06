import { IUser } from "./user";
import { IValidGender, IValidSize } from "./products";
import { TShippingAddressData } from "./addressData";

export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: Array<IOrderItem>;
  shippingAddress: TShippingAddressData;
  paymentResult?: string;

  quantityProducts: number;
  subtotalCost: number;
  taxRateCost: number;
  totalCost: number;

  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  size: IValidSize;
  gender: IValidGender;
  quantity: number;
  slug: string;
  image: string;
  price: number;
}