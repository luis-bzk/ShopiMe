import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type cartActionType =
  | {
      type: "UPDATE_PRODUCTS_IN_CART";
      payload: {
        cartProducts: Array<ICartProduct>;
        cartQuantityProducts: number;
        cartSubtotalCost: number;
        cartTaxRateCost: number;
        cartTotalCost: number;
      };
    }
  | { type: "SET_CART_LOADED" };

export const cartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
    case "UPDATE_PRODUCTS_IN_CART":
      return { ...state, ...action.payload };

    case "SET_CART_LOADED":
      return { ...state, cartIsLoaded: true };

    default:
      return state;
  }
};
