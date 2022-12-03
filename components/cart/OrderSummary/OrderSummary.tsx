import { Grid, Typography } from "@mui/material";
import { FC } from "react";

export const OrderSummary: FC = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. productos</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{`$${153}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (14%)</Typography>
      </Grid>

      <Grid item xs={6} display='flex' justifyContent={"end"}>
        <Typography sx={{ fontWeight: 600 }}>{`$${22.95}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }}>
        <Typography variant='subtitle1'>Total a pagar</Typography>
      </Grid>

      <Grid item xs={6} sx={{ marginTop: 2 }} display='flex' justifyContent={"end"}>
        <Typography variant='subtitle1'>{`$${175.95}`}</Typography>
      </Grid>
    </Grid>
  );
};
