import { FC, useContext } from "react";
import NextLink from "next/link";

import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UiContext } from "../../context";

interface Props {}

export const AdminNavbar: FC<Props> = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} legacyBehavior passHref>
          <Link display={"flex"} alignItems={"center"}>
            <Typography variant='h6'>ShopiMe |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={(event) => event.detail !== 0 && toggleSideMenu()}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
