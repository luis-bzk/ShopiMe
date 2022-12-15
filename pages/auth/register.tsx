import { useState, useContext } from "react";
import { NextPage } from "next";
import NextLink from "next/link";

import { useForm } from "react-hook-form";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../../components/layouts";
import { validations } from "../../utils";
import { shopiMeApi } from "../../api";
import axios from "axios";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

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
    <AuthLayout title={"Registrarse"}>
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component={"h1"}>
                Crear mi cuenta
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
                type={"text"}
                label='Nombre Completo'
                variant='filled'
                fullWidth
                {...register("name", {
                  required: "Este campo es requerido",
                  minLength: { value: 3, message: "El nombre debe tener mas de 3 caracteres" },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
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
                  required: "Este campo es requerido",
                  minLength: { value: 6, message: "La contraseña debe tener mas de 6 caracteres" },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' color='secondary' className='circular-btn' size='large' fullWidth>
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
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
