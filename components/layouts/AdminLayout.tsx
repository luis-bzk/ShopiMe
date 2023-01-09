import Head from "next/head";
import { FC, Fragment } from "react";
import { Navbar, SideMenu } from "../ui";
import { AdminNavbar } from "../admin";
import { Box, Typography } from "@mui/material";

interface Props {
  children: JSX.Element | Array<JSX.Element>;
  title: string;
  subTitle: string;
  pageDescription: string;
  icon?: JSX.Element;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, pageDescription, icon }) => {
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name='description' content={pageDescription} />
        <meta name='og:title' content={title} />
        <meta name='og:description' content={pageDescription} />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      {/* //TODO: Sidebar */}
      <SideMenu />

      <main
        style={{
          margin: "80px auto",
          maxWidth: "1440px",
          padding: "0px 30px",
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"h1"} component={"h1"}>
            {icon} {title}
          </Typography>

          <Typography variant={"h2"} component={"h2"} sx={{ marginBottom: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className='fadeIn'>{children}</Box>
      </main>
    </Fragment>
  );
};
