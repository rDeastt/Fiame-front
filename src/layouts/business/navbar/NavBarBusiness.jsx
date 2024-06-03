import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, CssBaseline, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

export const NavBarBusiness = (props) => {
    const storedUser = sessionStorage.getItem("Usuario");
    const user = JSON.parse(storedUser);
    const { children } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleClearSessionStorage = () => {
        sessionStorage.removeItem('Usuario');
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
                        <Link to="/Business" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}>
                            <img src="src/assets/logo.png" alt="Logo" style={{ height: '40px' }} />
                            <Typography variant="h6" sx={{ marginLeft: 1 }}>FiaMe</Typography>
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar src="src/assets/user.png" alt="User Avatar" />
                        <Typography variant="body1" sx={{ marginLeft: 1, color: 'black' }}>{user?.name || "Usuario"}</Typography>
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
                        <ListItem button component={Link} to="/Business">
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Página principal" />
                        </ListItem>
                        <ListItem button component={Link} to='/Business/CreatePaymentPlan'>
                            <ListItemIcon><DescriptionIcon /></ListItemIcon>
                            <ListItemText primary="Generar plan" />
                        </ListItem>
                        <ListItem button component={Link} to="/Business/ActiveClients">
                            <ListItemIcon><PeopleIcon /></ListItemIcon>
                            <ListItemText primary="Clientes" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <div>{children}</div>
        </>
    );
};


// import './NavBarBusiness.css'
// import {Link} from "react-router-dom";
// export const NavBarBusiness = (props) => {
//     const storedUser = sessionStorage.getItem("Usuario")
//     const user = JSON.parse(storedUser);
//     const { children } = props
//     const handleClearSessionStorage = () => {
//         // Borra el elemento 'Usuario' del sessionStorage
//         sessionStorage.removeItem('Usuario');
//         // Puedes agregar cualquier otra lógica que necesites después de borrar el elemento
//     };
//
//     return (
//         <>
//             <nav className="navbar">
//                 <div className="navbar-logo">
//                     <Link to="/Business">
//                         <img src="src/assets/logo.png" alt="Logo" className="logo-image"/>
//                     </Link>
//                     <h1>FiaMe</h1>
//                 </div>
//                 <div className="user-info">
//                     <img src="src/assets/user.png" alt="User Avatar" className="user-avatar"/>
//                     <span>{user.name}</span>
//                 </div>
//                 <button onClick={handleClearSessionStorage} className="logout-button">
//                     <Link to="/" className="logout-link">Cerrar Sesión</Link>
//                 </button>
//             </nav>
//             <div>{children}</div>
//         </>
//     );
// }


