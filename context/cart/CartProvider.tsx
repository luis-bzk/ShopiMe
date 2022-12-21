import { FC, useEffect, useReducer } from "react";

import Cookie from "js-cookie";

import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
import { addCartProduct, changeCartProductQuantity, deleteProductFromCart } from "./cartMethods";

// interface constructor -> state
export interface CartState {
  cartProducts: Array<ICartProduct>;
  cartQuantityProducts: number;
  cartSubtotalCost: number;
  cartTaxRateCost: number;
  cartTotalCost: number;
  cartIsLoaded: boolean;
}

// initial state
const CART_INITIAL_STATE: CartState = {
  cartProducts: [],
  cartQuantityProducts: 0,
  cartSubtotalCost: 0,
  cartTaxRateCost: 0,
  cartTotalCost: 0,
  cartIsLoaded: false,
};

// props provider
interface props {
  children: JSX.Element;
}

// provider
export const CartProvider: FC<props> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const { cartProducts, cartQuantityProducts, cartSubtotalCost, cartTaxRateCost, cartTotalCost } = state;
  const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

  // Set products form cookies
  useEffect(() => {
    try {
      const cartProductsCookies = Cookie.get("cartProducts") ? JSON.parse(Cookie.get("cartProducts")!) : [];

      dispatch({ type: "SET_CART_LOADED" });
      updateCartProducts(cartProductsCookies);
    } catch (error) {
      updateCartProducts([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    Cookie.set("cartProducts", JSON.stringify(newCartProducts));

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
    const newCartProducts = addCartProduct(cartProducts, productToAdd);
    updateCartProducts(newCartProducts);
  };

  // * Update product Quantity
  const updateCartQuantity = (productToChange: ICartProduct) => {
    const newCartProducts = changeCartProductQuantity(cartProducts, productToChange);
    updateCartProducts(newCartProducts);
  };

  // * Remove product from cart
  const removeCartProduct = (productToRemove: ICartProduct) => {
    const newCartProducts = deleteProductFromCart(cartProducts, productToRemove);
    updateCartProducts(newCartProducts);
  };

  const valuesProvider = {
    ...state,

    // methods
    addProductToCart,
    updateCartQuantity,
    removeCartProduct,
  };

  return <CartContext.Provider value={valuesProvider}>{children}</CartContext.Provider>;
};
