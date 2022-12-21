import { useContext, useEffect } from "react";
import { NextPage } from "next";

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";
import { useRouter } from "next/router";

const CartPage: NextPage = () => {
  const { cartQuantityProducts, cartIsLoaded } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (cartIsLoaded && cartQuantityProducts === 0) {
      router.replace("/cart/empty");
    }
  }, [cartIsLoaded, cartQuantityProducts, router]);

  if (!cartIsLoaded || cartQuantityProducts === 0) {
    return <></>;
  }

  return (
    <ShopLayout title={`Carrito - ${cartQuantityProducts}`} pageDescription={"Carrito de compras de la tienda"}>
      <Typography variant='h1' component={"h1"}>
        Carrito
      </Typography>

      <Grid container sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={7}>
          {/* cart list */}
          <CartList editable />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden </Typography>
              <Divider sx={{ marginY: 1 }} />

              {/* order summary */}
              <OrderSummary />

              <Box sx={{ marginTop: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Revisar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
