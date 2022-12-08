import { NextPage } from "next";

import { Typography } from "@mui/material";

import { useProducts } from "../../hooks";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

const MenCategoryPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=men");

  return (
    <ShopLayout title={"Shopi-Me | Hombres"} pageDescription={"Encuentra los mejores productos para hombres"}>
      <Typography variant='h1' component={"h1"}>
        Hombres
      </Typography>
      <Typography variant='h2' component={"h2"} sx={{ marginBottom: 1 }}>
        Productos para hombre
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default MenCategoryPage;
