import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";

import { dbProducts } from "../../database";
import { ItemCounter } from "../../components/ui";
import { ShopLayout } from "../../components/layouts";
import { ICartProduct, IProduct, IValidSize } from "../../interfaces";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { CartContext } from "../../context";
import { Currency } from "../../utils";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: IValidSize) => {
    setTempCartProduct((stateProduct) => ({ ...stateProduct, size: size }));
  };

  const updatedQuantity = (value: number) => {
    setTempCartProduct((stateProduct) => ({ ...stateProduct, quantity: value }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return;
    }

    addProductToCart(tempCartProduct);

    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection='column'>
            {/* title */}
            <Typography variant='h1' component={"h1"}>
              {product.title}
            </Typography>

            <Typography variant='subtitle1' component={"h2"}>
              {Currency.format(product.price)}
            </Typography>

            {/* quantity */}
            <Box sx={{ marginY: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={(value) => updatedQuantity(value)}
                maxValue={product.inStock}
              />
              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={(size) => onSelectedSize(size)}
              />
            </Box>

            {product.inStock > 0 ? (
              <Button
                color={tempCartProduct.size ? "secondary" : "primary"}
                className='circular-btn'
                disabled={tempCartProduct.size ? false : true}
                onClick={onAddProduct}
              >
                {tempCartProduct.size ? "Agregar al carrito" : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip label='No hay disponibles' color='error' variant='outlined' />
            )}

            {/* description */}
            <Box sx={{ marginTop: 3 }}>
              <Typography variant='subtitle2'>Descripción</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs(); // your fetch function here

  return {
    paths: productSlugs.map((obj) => ({
      params: { slug: obj.slug },
    })),

    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string }; // your fetch function here

  const product = await dbProducts.getProductBySlug(slug);
  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product: product,
    },
    revalidate: 86400,
  };
};

export default ProductPage;
