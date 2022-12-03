import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { FC } from "react";
import { ShopLayout } from "../../components/layouts";

const AddressPage: FC = () => {
  return (
    <ShopLayout title={"Checkout dirección"} pageDescription={"Confirmar dirección del destino"}>
      <Typography variant='h1' component={"h1"}>
        Dirección
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombre' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellido' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección 2' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Código Postal' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='filled' fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            {/* <InputLabel>País</InputLabel> */}
            <Select variant='filled' label='País' value={0}>
              <MenuItem value={0}>País</MenuItem>
              <MenuItem value={1}>Ecuador</MenuItem>
              <MenuItem value={2}>Colombia</MenuItem>
              <MenuItem value={3}>Peru</MenuItem>
              <MenuItem value={4}>Chile</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Teléfono' variant='filled' fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 5 }} display='flex' justifyContent={"center"}>
        <Button size='large' color='secondary' className='circular-btn'>
          Revisar pedido
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default AddressPage;
