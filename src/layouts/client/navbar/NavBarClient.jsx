import React, {useState} from 'react';
import './NavBarClient.css'
import {Link} from "react-router-dom";
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline, Drawer,
    IconButton, List, ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History.js";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const NavBarClient = (props) => {
    const storedUser = sessionStorage.getItem("Usuario");
    const user = JSON.parse(storedUser);
    const { children } = props;

    const handleClearSessionStorage = () => {
        // Borra el elemento 'Usuario' del sessionStorage
        sessionStorage.removeItem('Usuario');
        // Puedes agregar cualquier otra lógica que necesites después de borrar el elemento
    };

    // Estado y función para manejar el menú desplegable
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton edge="start" color="default" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Link to="/Client" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
                            <img src="src/assets/logo.png" alt="Logo" style={{ height: '40px' }} />
                            <Typography variant="h6" sx={{ marginLeft: 1 }}>FiaMe</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={"/Client/profile"}>
                            <Avatar src="src/assets/user.png" alt="User Avatar" />
                        </Link>
                        <Typography variant="body1" sx={{ marginLeft: 1, color: 'black' }}>{user?.name + " " + user?.lastname || "Usuario"}</Typography>
                    </Box>
                    <IconButton color="default" onClick={handleClearSessionStorage} component={Link} to="/">
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ width: 250 }}
                >
                    <List>
                        <ListItem button component={Link} to="/Client">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Página principal" />
                        </ListItem>
                        <ListItem button component={Link} to="/Client/profile">
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItem>
                        <ListItem button component={Link} to="/Client/history">
                            <ListItemIcon><HistoryIcon /></ListItemIcon>
                            <ListItemText primary="Historial" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <div>{children}</div>
        </>
    );
}

