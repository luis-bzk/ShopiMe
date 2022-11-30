import { FC } from "react";
import { Grid } from "@mui/material";
import { IProduct } from "../../../interfaces";
import { ProductCard } from "../ProductCard/ProductCard";

interface Props {
  products: Array<IProduct>;
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => {
        return <ProductCard key={product.slug} product={product} />;
      })}
    </Grid>
  );
};
