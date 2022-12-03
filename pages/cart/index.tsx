import { FC } from "react";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

const CartPage: FC = () => {
  return (
    <ShopLayout title={"Carrito - 3"} pageDescription={"Carrito de compras de la tienda"}>
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
