import { Fragment, use, useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";

import { UiContext, AuthContext } from "../../../context";

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  console.log({ router });

  const navigateTo = (url: string) => {
    router.push(url);
    toggleSideMenu();
  };

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) {
      return;
    }

    navigateTo(`/search/${searchTerm}`);
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor='right'
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => (event.key === "Enter" ? onSearchTerm() : null)}
              type='text'
              placeholder='Buscar...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {isLoggedIn && (
            <Fragment>
              <ListItemButton onClick={() => navigateTo("/profile")}>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/orders/history")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItemButton>
            </Fragment>
          )}

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/men")}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/women")}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItemButton>

          <ListItemButton sx={{ display: { xs: "", sm: "none" } }} onClick={() => navigateTo("/category/kid")}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItemButton>

          {!isLoggedIn && (
            <ListItemButton onClick={() => navigateTo(`/auth/login?page=${router.asPath ? router.asPath : ""}`)}>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>
          )}

          {isLoggedIn && (
            <ListItemButton onClick={logoutUser}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          )}

          {isLoggedIn && user?.role === "admin" && (
            <Fragment>
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItemButton onClick={() => navigateTo("/cart")}>
                <ListItemIcon>
                  <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary={"Productos"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/orders/history")}>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ordenes"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/users")}>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>
                <ListItemText primary={"Usuarios"} />
              </ListItemButton>
            </Fragment>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
