import { FC, Fragment, useContext } from "react";
import NextLink from "next/link";

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";

import { ItemCounter } from "../../ui";
import { CartContext } from "../../../context";
import { ICartProduct } from "../../../interfaces";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cartProducts, updateCartQuantity, removeCartProduct } = useContext(CartContext);

  const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  return (
    <Fragment>
      {cartProducts.map((product) => {
        return (
          <Grid container key={product._id + product.size} spacing={2} sx={{ marginBottom: 1 }}>
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} legacyBehavior passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia image={`/products/${product.image}`} component='img' sx={{ borderRadius: "5px" }} />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display={"flex"} flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body2'>
                  Talla: <strong>{product.size}</strong>
                </Typography>

                {/* conditional */}
                {editable ? (
                  <ItemCounter
                    currentValue={product.quantity}
                    updatedQuantity={(value) => onNewCartQuantityValue(product, value)}
                    maxValue={10}
                  />
                ) : (
                  <Typography sx={{ marginTop: 1, fontWeight: 500 }}>
                    {`${product.quantity} ${product.quantity > 1 ? "productos" : "producto"}`}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={2} display={"flex"} alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {/* editable */}
              {editable && (
                <Button variant='text' color='secondary' onClick={() => removeCartProduct(product)}>
                  Eliminar
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}

      {cartProducts.length === 0 && (
        <Typography variant='h2' component={"h2"}>
          No has agregado productos al carrito todavía :)
        </Typography>
      )}
    </Fragment>
  );
};
