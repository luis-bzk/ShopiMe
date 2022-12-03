import { FC } from "react";
import { ShopLayout } from "../../components/layouts";
import NextLink from "next/link";
import { CartList, OrderSummary } from "../../components/cart";
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";

const SummaryPage: FC = () => {
  return (
    <ShopLayout title={"Resumen de orden"} pageDescription={"Resumen de la orden"}>
      <Typography variant='h1' component={"h1"}>
        Resumen de la orden
      </Typography>

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
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
