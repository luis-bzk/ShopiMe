import { NextPage } from "next";

import { Typography } from "@mui/material";

import { useProducts } from "../../hooks";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { FullScreenLoading } from "../../components/ui";

const KidCategoryPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=kid");
  return (
    <ShopLayout title={"Shopi-Me | Niños"} pageDescription={"Encuentra los mejores productos para niños"}>
      <Typography variant='h1' component={"h1"}>
        Niños
      </Typography>
      <Typography variant='h2' component={"h2"} sx={{ marginBottom: 1 }}>
        Productos para los mas pequeños
      </Typography>

      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default KidCategoryPage;
