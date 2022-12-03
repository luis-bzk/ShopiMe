import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { seedData } from "../database";
import { ProductList } from "../components/products";
import { IProduct } from "../interfaces/products";

// initialData

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Shopi-Me - Home"}
      pageDescription={"Encuentra lo que necesitas al mejor precio aquí"}
    >
      <Typography
        variant='h1'
        component={"h1"}
      >
        Tienda
      </Typography>
      <Typography
        variant='h2'
        component={"h2"}
        sx={{ marginBottom: 1 }}
      >
        Todos los productos
      </Typography>

      <ProductList products={seedData.initialData.products as Array<IProduct>} />
    </ShopLayout>
  );
};

export default Home;
