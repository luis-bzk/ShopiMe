import { createContext } from "react";
import { TShippingAddressData, ICartProduct } from "../../interfaces";

interface ContextProps {
  cartProducts: Array<ICartProduct>;
  cartQuantityProducts: number;
  cartSubtotalCost: number;
  cartTaxRateCost: number;
  cartTotalCost: number;
  cartIsLoaded: boolean;

  shippingAddress?: TShippingAddressData;

  // methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: TShippingAddressData) => void;
}

export const CartContext = createContext({} as ContextProps);
