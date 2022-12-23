import { NextPage } from "next";
import NextLink from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";

import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";

import { countries } from "../../utils";
import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";

const SummaryPage: NextPage = () => {
  const { shippingAddress, cartQuantityProducts } = useContext(CartContext);

  const router = useRouter();

  if (!shippingAddress) {
    return <></>;
  }

  const countryNameDecoded = (countryCode: string) => {
    const country = countries.filter((country) => country.code === countryCode);

    return country[0].name;
  };
  const { name, lastname, address, address2 = "", city, country, phone, zipcode } = shippingAddress;

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
              <Typography variant='h2'>
                Resumen ({cartQuantityProducts} {cartQuantityProducts > 1 ? "productos" : "producto"} )
              </Typography>

              <Divider sx={{ marginY: 1 }} />

              <Box display={"flex"} justifyContent='space-between' alignItems={"center"}>
                <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href={"/checkout/address"} legacyBehavior passHref>
                  <Link underline='always'>Editar</Link>
                </NextLink>
              </Box>

              <Typography>
                {name} {lastname}
              </Typography>
              <Typography>
                {address} {address2 && `, ${address2}`}
              </Typography>
              <Typography>
                {city}, {zipcode}
              </Typography>
              <Typography>{countryNameDecoded(country)}</Typography>
              <Typography>{phone}</Typography>

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
