import { FC, Fragment } from "react";
import NextLink from "next/link";
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";
import { seedData } from "../../../database";
import { ItemCounter } from "../../ui";

const productsInCart = [
  seedData.initialData.products[0],
  seedData.initialData.products[1],
  seedData.initialData.products[2],
  seedData.initialData.products[3],
];

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  return (
    <Fragment>
      {productsInCart.map((product) => {
        return (
          <Grid
            container
            key={product.slug}
            spacing={2}
            sx={{ marginBottom: 1 }}
          >
            <Grid
              item
              xs={3}
            >
              {/* //TODO: redirect product page */}
              <NextLink
                href={"/product/slug"}
                legacyBehavior
                passHref
              >
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.images[0]}`}
                      component='img'
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid
              item
              xs={7}
            >
              <Box
                display={"flex"}
                flexDirection='column'
              >
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body2'>
                  Talla: <strong>{product.sizes[0]}</strong>
                </Typography>

                {/* conditional */}
                {editable ? (
                  <ItemCounter />
                ) : (
                  <Typography sx={{ marginTop: 1, fontWeight: 500 }}>{`3 items`}</Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display={"flex"}
              alignItems='center'
              flexDirection='column'
            >
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {/* editable */}
              {editable && (
                <Button
                  variant='text'
                  color='secondary'
                >
                  Eliminar
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </Fragment>
  );
};
