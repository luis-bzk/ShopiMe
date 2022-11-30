import NextLink from "next/link";
import { FC } from "react";
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

interface Props {}

export const Navbar: FC<Props> = () => {
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

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href={"/category/men"} legacyBehavior passHref>
            <Link>
              <Button>Hombres</Button>
            </Link>
          </NextLink>

          <NextLink href={"/category/women"} legacyBehavior passHref>
            <Link>
              <Button>Mujeres</Button>
            </Link>
          </NextLink>

          <NextLink href={"/category/kid"} legacyBehavior passHref>
            <Link>
              <Button>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href={"/cart"} legacyBehavior passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color={"secondary"}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
