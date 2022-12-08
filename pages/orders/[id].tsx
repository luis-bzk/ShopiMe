import { NextPage } from "next";
import NextLink from "next/link";

import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout title={"Orden: 28DSA-34F"} pageDescription={"Resumen de la orden"}>
      <Typography variant='h1' component={"h1"}>
        Resumen de la orden: 28DSA-34F
      </Typography>

      {/* <Chip
        sx={{ marginY: 2 }}
        label='Pendiente de pago'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ marginY: 2 }}
        label='Orden pagada'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />

      <Grid container sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen (3 productos)</Typography>

              <Divider sx={{ marginY: 1 }} />

              <Box display={"flex"} justifyContent='space-between' alignItems={"center"}>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href={"/checkout/address"} legacyBehavior passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>Fernando herrera</Typography>
              <Typography>Cuenca Ecuador</Typography>
              <Typography>Vicente Mideros</Typography>
              <Typography>+593 098 765 4321</Typography>

              <Divider sx={{ marginY: 1 }} />

              <Box display={"flex"} justifyContent='end'>
                <NextLink href={"/cart"} legacyBehavior passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <OrderSummary />

              <Box sx={{ marginTop: 3 }}>
                {/* //TODO */}
                <h1>Pagar</h1>

                <Chip
                  sx={{ marginY: 2 }}
                  label='Orden pagada'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
