import { FC, useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

import { CartContext, UiContext } from "../../../context";

interface Props {}

// const categoryRoutes = ["/category/men", "/category/women", "/category/kid"];
const categoryRoutes = [
  { url: "/category/men", name: "Hombres" },
  { url: "/category/women", name: "Mujeres" },
  { url: "/category/kid", name: "Niños" },
];

export const Navbar: FC<Props> = () => {
  const router = useRouter();
  const { cartQuantityProducts } = useContext(CartContext);
  const { toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const setPathCategory = (url: string) => {
    return router.asPath === url ? "primary" : "info";
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) {
      return;
    }

    router.push(`/search/${searchTerm}`);

    setSearchTerm("");
    setIsSearchVisible(false);
  };

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

        <Box className='fadeIn' sx={{ display: isSearchVisible ? "none" : { xs: "none", sm: "block" } }}>
          {categoryRoutes.map((routeNav) => {
            return (
              <NextLink href={routeNav.url} legacyBehavior passHref key={routeNav.name}>
                <Link>
                  <Button color={setPathCategory(routeNav.url)}>{routeNav.name}</Button>
                </Link>
              </NextLink>
            );
          })}
        </Box>

        <Box flex={1} />

        {/* desktop */}
        {isSearchVisible ? (
          <Input
            className='fadeIn'
            autoFocus
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyDown={(event) => (event.key === "Enter" ? onSearchTerm() : null)}
            type='text'
            placeholder='Buscar...'
            sx={{ display: { xs: "none", sm: "flex" } }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => {}}>
                  <ClearOutlined onClick={() => setIsSearchVisible(false)} />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className='fadeIn'
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* mobile */}
        <IconButton sx={{ display: { xs: "flex", sm: "none" } }} onClick={toggleSideMenu}>
          <SearchOutlined />
        </IconButton>

        <NextLink href={"/cart"} legacyBehavior passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={cartQuantityProducts} color={"secondary"}>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={(event) => event.detail !== 0 && toggleSideMenu()}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
