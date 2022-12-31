import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { FormControl, Grid, MenuItem, TextField, Typography, Box, Button } from "@mui/material";

import { countries } from "../../utils";
import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts";
import { TShippingAddressData } from "../../interfaces";

const getAddressFromCookies = (): TShippingAddressData => {
  return {
    name: Cookies.get("name") || "",
    lastname: Cookies.get("lastname") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zipcode: Cookies.get("zipcode") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage: NextPage = () => {
  const { updateAddress } = useContext(CartContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TShippingAddressData>({
    defaultValues: {
      name: "",
      lastname: "",
      address: "",
      address2: "",
      zipcode: "",
      city: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const onSetAddress = async (data: TShippingAddressData) => {
    updateAddress(data);

    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title={"Checkout dirección"} pageDescription={"Confirmar dirección del destino"}>
      <form onSubmit={handleSubmit(onSetAddress)}>
        <Typography variant='h1' component={"h1"}>
          Dirección
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              label='Nombre'
              variant='filled'
              fullWidth
              {...register("name", {
                required: "Este campo es necesario",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              label='Apellido'
              variant='filled'
              fullWidth
              {...register("lastname", {
                required: "Este campo es necesario",
              })}
              error={!!errors.lastname}
              helperText={errors.lastname?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              label='Dirección'
              variant='filled'
              fullWidth
              {...register("address", {
                required: "Este campo es necesario",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type={"text"} label='Dirección 2' variant='filled' fullWidth {...register("address2")} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              label='Código Postal'
              variant='filled'
              fullWidth
              {...register("zipcode", {
                required: "Este campo es necesario",
              })}
              error={!!errors.zipcode}
              helperText={errors.zipcode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"text"}
              label='Ciudad'
              variant='filled'
              fullWidth
              {...register("city", {
                required: "Este campo es necesario",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              {/* <InputLabel>País</InputLabel> */}
              <TextField
                // select
                type={"text"}
                variant='filled'
                label='País'
                fullWidth
                // defaultValue={Cookies.get("country") || countries[0].code}
                {...register("country", {
                  required: "Este campo es necesario",
                })}
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {/* {countries.map((country) => {
                  return (
                    <MenuItem value={country.code} key={country.code}>
                      {country.name}
                    </MenuItem>
                  );
                })} */}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type={"number"}
              label='Teléfono'
              variant='filled'
              fullWidth
              {...register("phone", {
                required: "Este campo es necesario",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 5 }} display='flex' justifyContent={"center"}>
          <Button type='submit' size='large' color='secondary' className='circular-btn'>
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
