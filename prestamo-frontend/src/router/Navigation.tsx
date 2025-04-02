import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import {
  Avatar,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/client";
import { module } from "./module";

type ToggleDrawerEvent = React.KeyboardEvent | React.MouseEvent;

const settings = [
  {
    text: "Cuenta",
    link: "/cuenta",
  },
  {
    text: "Cerrar sesión",
    link: "/login",
  },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useDispatch<AppDispatch>();
  const { role } = useSelector((state: RootState) => state.login);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = (open: boolean) => (event: ToggleDrawerEvent) => {
    if (
      event.type === "keydown" &&
      "key" in event &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const onNavigate = (path: string) => {
    if (path === "/login") {
      console.log("ssss");
      dispatch(logout());
    }
    setAnchorElUser(null);
    navigate(path);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h2" sx={{ flexGrow: 1 }} color="inherit">
            VMS Préstamos
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.link}
                  onClick={() => onNavigate(setting.link)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            borderRadius: "0px 10px 10px 0px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            width: 260,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Encabezado */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 3,
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid #ddd",
            }}
          >
            <Box display="flex" justifyContent="center" mb={2} sx={{
                 transition: "transform 0.2s ease-in-out",
                 "&:hover": { transform: "scale(1.1)" },
            }}>
              <img
                src="/vite.png"
                alt="Logo"
                style={{ width: 100, height: 90 }}
              />
            </Box>
          </Box>

          {/* Lista de Opciones */}
          <List sx={{ mt: 1 }}>
            {module[role].map(
              (item: { text: string; link: string; icon: React.ReactNode }) => (
                <ListItem
                  disablePadding
                  onClick={() => onNavigate(item.link)}
                  key={item.text}
                  sx={{
                    borderRadius: 2,
                    transition: "background-color 0.2s ease-in-out",
                    "&:hover": { backgroundColor: "#f0f8ff" },
                  }}
                >
                  <ListItemButton sx={{ pl: 3 }}>
                    <ListItemIcon sx={{ minWidth: 40, color: "#1976d2" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#333",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
