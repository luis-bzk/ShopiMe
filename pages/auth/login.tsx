import { NextPage } from "next";
import NextLink from "next/link";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../../components/layouts";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title={"Ingresar"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component={"h1"}>
              Iniciar Sesión
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label='Contraseña' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              ingresar
            </Button>
          </Grid>

          <Grid item xs={12} display={"flex"} justifyContent='space-between'>
            <Typography>No tienes una cuenta?</Typography>
            <NextLink href={"/auth/register"} legacyBehavior passHref>
              <Link underline='always' className='blue-link'>
                Crea una
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
