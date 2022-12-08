import { createContext } from "react";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
  cartProducts: Array<ICartProduct>;
  cartQuantityProducts: number;
  cartSubtotalCost: number;
  cartTaxRateCost: number;
  cartTotalCost: number;

  // methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
