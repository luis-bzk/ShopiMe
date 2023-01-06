import { Fragment, useEffect, useState } from "react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import { getProviders, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";

import { validations } from "../../utils";
import { AuthLayout } from "../../components/layouts";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      // console.log(prov);
      setProviders(prov);
    });
  }, []);

  const pageDestination = router.query.page?.toString() || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    // const { hasError, message } = await loginUser(email, password);

    // if (hasError) {
    //   setErrorMessage(message!);

    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // // TODO navegar a la pagina que el usuario estaba
    // router.replace(pageDestination);

    await signIn("credentials", { email, password });
    // console.log({ response });
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
              <NextLink href={`/auth/register?page=${pageDestination}`} legacyBehavior passHref>
                <Link underline='always' className='blue-link'>
                  Crea una
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display={"flex"} flexDirection={"column"} justifyContent='space-between'>
              <Divider sx={{ width: "100%", marginBottom: 2 }} />

              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") {
                  return <Fragment key={provider.id} />;
                }
                return (
                  <Button
                    key={provider.id}
                    variant='outlined'
                    fullWidth
                    color='primary'
                    sx={{ marginBottom: 1 }}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  const { page = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString()!,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
