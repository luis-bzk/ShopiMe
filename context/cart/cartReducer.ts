import { ICartProduct, TShippingAddressData } from "../../interfaces";
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
  | { type: "SET_CART_LOADED" }
  | { type: "LOAD_ADDRESS_FROM_COOKIES"; payload: TShippingAddressData }
  | { type: "UPDATE_SHIPPING_ADDRESS"; payload: TShippingAddressData };

export const cartReducer = (state: CartState, action: cartActionType): CartState => {
  switch (action.type) {
    case "UPDATE_PRODUCTS_IN_CART":
      return { ...state, ...action.payload };

    case "SET_CART_LOADED":
      return { ...state, cartIsLoaded: true };

    case "UPDATE_SHIPPING_ADDRESS":
    case "LOAD_ADDRESS_FROM_COOKIES":
      return { ...state, shippingAddress: action.payload };

    default:
      return state;
  }
};
