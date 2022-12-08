import { NextPage } from "next";
import NextLink from "next/link";

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../../components/layouts";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title={"Registrarse"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component={"h1"}>
              Crear mi cuenta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Nombre Completo' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label='Correo' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField label='Contraseña' variant='filled' fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Button color='secondary' className='circular-btn' size='large' fullWidth>
              Registrarme
            </Button>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent='space-between'>
            <Typography>olvidaste tu contraseña?</Typography>
            <NextLink href={"/auth/forgot-password"} legacyBehavior passHref>
              <Link underline='always' className='blue-link'>
                Recuperar cuenta
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent='space-between'>
            <Typography>Ya tienes una cuenta?</Typography>
            <NextLink href={"/auth/login"} legacyBehavior passHref>
              <Link underline='always' className='blue-link'>
                Inicia Sesión
              </Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
