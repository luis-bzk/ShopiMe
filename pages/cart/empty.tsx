import { FC } from "react";
import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

const EmptyPage: FC = () => {
  return (
    <ShopLayout title={"Carrito vacío"} pageDescription='No hay artículos en el carrito'>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"calc(100vh - 200px)"}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 40 }} />
        <Box display={"flex"} flexDirection='column' alignItems='center'>
          <Typography>Su carrito esta vacío</Typography>
          <NextLink href={"/"} legacyBehavior passHref>
            <Link typography='h4' className='blue-link'>
              Regresar
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
