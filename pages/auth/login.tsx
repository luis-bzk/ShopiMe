import { useState, useContext } from "react";
import { NextPage } from "next";
import NextLink from "next/link";

import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";

import { shopiMeApi } from "../../api";
import { validations } from "../../utils";
import { AuthContext } from "../../context";
import { AuthLayout } from "../../components/layouts";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await loginUser(email, password);

    if (hasError) {
      setErrorMessage(message!);

      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    // TODO navegar a la pagina que el usuario estaba
    router.replace("/");
  };

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component={"h1"}>
                Iniciar Sesión
              </Typography>
              <Chip
                label={errorMessage}
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? "flex" : "none" }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={"email"}
                label='Correo'
                variant='filled'
                fullWidth
                {...register("email", {
                  required: "Este campo es requerido",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type={"password"}
                label='Contraseña'
                variant='filled'
                fullWidth
                {...register("password", {
                  required: "Este campo es necesario",
                  minLength: { value: 6, message: "Se necesitan mas de 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
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
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
