import { ICartProduct } from "../../interfaces";

// METHODS
export const addCartProduct = (cartProducts: Array<ICartProduct>, productToAdd: ICartProduct) => {
  const existCartProduct = cartProducts.find(
    (cartProduct) => cartProduct._id === productToAdd._id && cartProduct.size === productToAdd.size
  );

  if (existCartProduct) {
    return cartProducts.map((cartProduct) =>
      cartProduct._id === productToAdd._id && cartProduct.size === productToAdd.size
        ? { ...cartProduct, quantity: cartProduct.quantity + productToAdd.quantity }
        : cartProduct
    );
  }

  return [...cartProducts, productToAdd];
};

export const changeCartProductQuantity = (cartProducts: Array<ICartProduct>, productToChange: ICartProduct) => {
  return cartProducts.map((product) => {
    return product._id !== productToChange._id
      ? product
      : product.size !== productToChange.size
      ? product
      : { ...product, quantity: productToChange.quantity };
  });
};

export const deleteProductFromCart = (cartProducts: Array<ICartProduct>, productToRemove: ICartProduct) => {
  console.log({ cartProducts });
  const updatedItems = cartProducts.filter(
    (product) => !(product._id === productToRemove._id && product.size === productToRemove.size)
  );

  if (!updatedItems) {
    return [];
  }

  return updatedItems;
};
