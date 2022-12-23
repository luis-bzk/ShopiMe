import { FC, useEffect, useReducer } from "react";

import { CartContext, cartReducer } from "./";
import { ICartProduct, TShippingAddressData } from "../../interfaces";
import { addCartProduct, changeCartProductQuantity, deleteProductFromCart } from "./cartMethods";
import Cookies from "js-cookie";

// interface constructor -> state
export interface CartState {
  cartProducts: Array<ICartProduct>;
  cartQuantityProducts: number;
  cartSubtotalCost: number;
  cartTaxRateCost: number;
  cartTotalCost: number;
  cartIsLoaded: boolean;
  shippingAddress?: TShippingAddressData;
}

// initial state
const CART_INITIAL_STATE: CartState = {
  cartProducts: [],
  cartQuantityProducts: 0,
  cartSubtotalCost: 0,
  cartTaxRateCost: 0,
  cartTotalCost: 0,
  cartIsLoaded: false,
  shippingAddress: undefined,
};

// props provider
interface props {
  children: JSX.Element;
}

// provider
export const CartProvider: FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  // const { cartProducts, cartQuantityProducts, cartSubtotalCost, cartTaxRateCost, cartTotalCost } = state;
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

  // Set products form cookies
  useEffect(() => {
    try {
      const cartProductsCookies = Cookies.get("cartProducts") ? JSON.parse(Cookies.get("cartProducts")!) : [];

      dispatch({ type: "SET_CART_LOADED" });
      updateCartProducts(cartProductsCookies);
    } catch (error) {
      updateCartProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get address data from cookies
  useEffect(() => {
    if (Cookies.get("name")) {
      const userAddressCookies: TShippingAddressData = {
        name: Cookies.get("name") || "",
        lastname: Cookies.get("lastname") || "",
        address: Cookies.get("address") || "",
        address2: Cookies.get("address2") || "",
        zipcode: Cookies.get("zipcode") || "",
        city: Cookies.get("city") || "",
        country: Cookies.get("country") || "",
        phone: Cookies.get("phone") || "",
      };

      dispatch({ type: "LOAD_ADDRESS_FROM_COOKIES", payload: userAddressCookies });
    }
  }, []);

  // * General Function
  const updateCartProducts = (newCartProducts: Array<ICartProduct>) => {
    const cartCountProducts = newCartProducts.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const cartCalSubtotalCart = newCartProducts.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    // const cartCalcTaxRate = Number((cartCalSubtotalCart * taxRate).toFixed(2));
    const cartCalcTaxRate = cartCalSubtotalCart * taxRate;
    const cartCalcTotalCost = cartCalcTaxRate + cartCalSubtotalCart;

    // * set cookies
    Cookies.set("cartProducts", JSON.stringify(newCartProducts));

    dispatch({
      type: "UPDATE_PRODUCTS_IN_CART",
      payload: {
        cartProducts: newCartProducts,
        cartQuantityProducts: cartCountProducts,
        cartSubtotalCost: cartCalSubtotalCart,
        cartTaxRateCost: cartCalcTaxRate,
        cartTotalCost: cartCalcTotalCost,
      },
    });
  };

  // * Add product
  const addProductToCart = (productToAdd: ICartProduct) => {
    const newCartProducts = addCartProduct(state.cartProducts, productToAdd);
    updateCartProducts(newCartProducts);
  };

  // * Update product Quantity
  const updateCartQuantity = (productToChange: ICartProduct) => {
    const newCartProducts = changeCartProductQuantity(state.cartProducts, productToChange);
    updateCartProducts(newCartProducts);
  };

  // * Remove product from cart
  const removeCartProduct = (productToRemove: ICartProduct) => {
    const newCartProducts = deleteProductFromCart(state.cartProducts, productToRemove);
    updateCartProducts(newCartProducts);
  };

  const updateAddress = (address: TShippingAddressData) => {
    Cookies.set("name", address.name);
    Cookies.set("lastname", address.lastname);
    Cookies.set("address", address.address);
    Cookies.set("address2", address.address2 || "");
    Cookies.set("zipcode", address.zipcode);
    Cookies.set("city", address.city);
    Cookies.set("country", address.country);
    Cookies.set("phone", address.phone);

    dispatch({ type: "UPDATE_SHIPPING_ADDRESS", payload: address });
  };

  const valuesProvider = {
    ...state,

    // methods
    addProductToCart,
    updateCartQuantity,
    removeCartProduct,
    updateAddress,
  };

  return <CartContext.Provider value={valuesProvider}>{children}</CartContext.Provider>;
};
