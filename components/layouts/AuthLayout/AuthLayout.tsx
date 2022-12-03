import { Box } from "@mui/material";
import Head from "next/head";
import { FC, Fragment } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
}

export const AuthLayout: FC<Props> = ({ children, title }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"calc(100vh - 200px)"}
          // height={"100vh"}
          // sx={{ overflowY: "scroll", backgroundColor: "#543543" }}
        >
          {children}
        </Box>
      </main>
    </Fragment>
  );
};
