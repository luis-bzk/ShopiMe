import { Grid, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { CartContext } from "../../context";
import { Currency } from "../../utils";

interface ISummary {
  quantityProducts: number;
  subtotalCost: number;
  taxRateCost: number;
  totalCost: number;
}

interface Props {
  // orderValues?: { quantityProducts: number; subtotalCost: number; taxRateCost: number; totalCost: number };
  orderValues?: ISummary;
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { cartQuantityProducts, cartSubtotalCost, cartTaxRateCost, cartTotalCost } = useContext(CartContext);

  const summary: ISummary = orderValues
    ? orderValues
    : {
        quantityProducts: cartQuantityProducts,
        subtotalCost: cartSubtotalCost,
        taxRateCost: cartTaxRateCost,
        totalCost: cartTotalCost,
      };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>
          {`${summary.quantityProducts} ${summary.quantityProducts > 1 ? "items" : "item"}`}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{Currency.format(summary.subtotalCost)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Math.round(Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100)}%)</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{Currency.format(summary.taxRateCost)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <Typography variant='subtitle1'>Total a pagar</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }} display='flex' justifyContent={"end"}>
        <Typography variant='subtitle1'>{Currency.format(summary.totalCost)}</Typography>
      </Grid>
    </Grid>
  );
};
