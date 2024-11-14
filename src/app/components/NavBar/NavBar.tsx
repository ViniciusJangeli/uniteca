"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { AccountCircle, Menu as MenuIcon, Book, People, Assignment, Home } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const StyledAppBar = styled(AppBar)({
  backgroundColor: "#005387",
  height: "80px",
});

const StyledToolbar = styled(Toolbar)({
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const MenuButton = styled(Button)({
  color: "#FFFFFF",
  marginRight: "16px",
  fontSize: '16px',
});

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Início', icon: <Home />, onClick: () => router.push('/inicio') },
    { text: 'Livros', icon: <Book />, onClick: () => router.push('/livros') },
    { text: 'Empréstimos', icon: <Assignment />, onClick: () => router.push('/emprestimos') },
    { text: 'Usuários', icon: <People />, onClick: () => router.push('/usuarios') },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem sx={{cursor: 'pointer'}} button key={item.text} onClick={item.onClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem sx={{cursor: 'pointer'}} button onClick={() => router.push('/perfil')}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Meu Perfil" />
        </ListItem>
        <ListItem sx={{cursor: 'pointer'}} button onClick={() => console.log('Logout')}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Image
            src="/images/LogoBranco.svg"
            alt="Logo Uniteca"
            priority
            width={150}
            height={150}
          />
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                {menuItems.map((item) => (
                  <MenuButton key={item.text} color="inherit" onClick={item.onClick}>
                    {item.text}
                  </MenuButton>
                ))}
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography>Bem vindo, Vinicius Jangeli.</Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              </Box>
            </>
          )}
        </StyledToolbar>
      </StyledAppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => router.push('/perfil')}>Meu Perfil</MenuItem>
        <MenuItem onClick={() => console.log('Logout')}>Sair</MenuItem>
      </Menu>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </>
  );
}