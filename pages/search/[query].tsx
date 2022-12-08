import type { NextPage, GetServerSideProps } from "next";

import { Box, Typography } from "@mui/material";

import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { Fragment } from "react";

interface Props {
  products: Array<IProduct>;
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Shopi-Me | Search"}
      pageDescription={"Encuentra lo que necesitas al mejor precio aquí"}
    >
      <Typography
        variant='h1'
        component={"h1"}
      >
        Buscar Productos
      </Typography>

      {foundProducts ? (
        <Box display='flex'>
          <Typography
            variant='h2'
            component={"h2"}
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            Productos relacionados con
          </Typography>

          <Typography
            variant='h2'
            component={"h2"}
            sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}
            color='secondary'
            textTransform='capitalize'
          >
            {`"${query}"`}
          </Typography>
        </Box>
      ) : (
        <Box display='flex'>
          <Typography
            variant='h2'
            component={"h2"}
            sx={{ marginTop: 1, marginBottom: 1 }}
          >
            No encontramos ningún producto relacionado con:
          </Typography>

          <Typography
            variant='h2'
            component={"h2"}
            sx={{ marginTop: 1, marginBottom: 1, marginLeft: 1 }}
            color='secondary'
            textTransform='capitalize'
          >
            {`"${query}"`}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerms(query); // your fetch function here
  const foundProducts = products.length > 0;

  // TODO: Retornar otros productos si no existe X producto
  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: { products: products, foundProducts: foundProducts, query: query },
  };
};

export default SearchPage;
