import { NextPage } from "next";

import { Typography } from "@mui/material";

import { useProducts } from "../../hooks";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

const WomenCategoryPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=women");
  return (
    <ShopLayout title={"Categoría  |  Mujeres"} pageDescription={"Encuentra los mejores productos para mujeres"}>
      <Typography variant='h1' component={"h1"}>
        Mujeres
      </Typography>

      <Typography variant='h2' component={"h2"} sx={{ marginBottom: 1 }}>
        Productos para mujer
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default WomenCategoryPage;
