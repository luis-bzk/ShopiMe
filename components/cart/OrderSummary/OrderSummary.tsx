import { Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CartContext } from "../../../context";
import { Currency } from "../../../utils";

export const OrderSummary: FC = () => {
  const { cartQuantityProducts, cartSubtotalCost, cartTaxRateCost, cartTotalCost } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>
          {`${cartQuantityProducts} ${cartQuantityProducts > 1 ? "items" : "item"}`}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{Currency.format(cartSubtotalCost)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Math.round(Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100)}%)</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{Currency.format(cartTaxRateCost)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <Typography variant='subtitle1'>Total a pagar</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }} display='flex' justifyContent={"end"}>
        <Typography variant='subtitle1'>{Currency.format(cartTotalCost)}</Typography>
      </Grid>
    </Grid>
  );
};
