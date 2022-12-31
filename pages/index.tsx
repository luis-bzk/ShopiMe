import type { NextPage } from "next";
// import { seedData } from "../database";
import { Typography } from "@mui/material";

import { useProducts } from "../hooks";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";

const HomePage: NextPage = () => {
  const { products, isError, isLoading } = useProducts("/products");

  return (
    <ShopLayout title={"Shopi-Me | Home"} pageDescription={"Encuentra lo que necesitas al mejor precio aquí"}>
      <Typography variant='h1' component={"h1"}>
        Tienda
      </Typography>
      <Typography variant='h2' component={"h2"} sx={{ marginBottom: 1 }}>
        Todos los productos
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default HomePage;
