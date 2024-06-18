import React, {useEffect, useState} from 'react';
import './NavBarClient.css';
import { Link } from "react-router-dom";
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline, Drawer,
    IconButton, List, ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Menu,
    MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';

export const NavBarClient = (props) => {
    const storedUser = sessionStorage.getItem("Usuario");
    const user = JSON.parse(storedUser);
    const { children } = props;

    const handleClearSessionStorage = () => {
        sessionStorage.removeItem('Usuario');
    };

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [reportMenuAnchorEl, setReportMenuAnchorEl] = useState(null);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleReportMenuClick = (event) => {
        event.stopPropagation();
        setReportMenuAnchorEl(event.currentTarget);
    };

    const handleReportMenuClose = () => {
        setReportMenuAnchorEl(null);
    };
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'hs-script-loader';
        script.async = true;
        script.defer = true;
        script.src = '//js-na1.hs-scripts.com/45899168.js';
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <CssBaseline/>
            <AppBar position="static" sx={{backgroundColor: 'white'}}>
                <Toolbar>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <IconButton edge="start" color="default" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Link to="/Client"
                              style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black'}}>
                            <img src="src/assets/logo.png" alt="Logo" style={{height: '40px'}}/>
                            <Typography variant="h6" sx={{marginLeft: 1}}>FiaMe</Typography>
                        </Link>
                    </Box>
                    <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Link to={"/Client/profile"}>
                            <Avatar src="src/assets/user.png" alt="User Avatar"/>
                        </Link>
                        <Typography variant="body1" sx={{
                            marginLeft: 1,
                            color: 'black'
                        }}>{user?.name + " " + user?.lastname || "Usuario"}</Typography>
                    </Box>
                    <IconButton color="default" onClick={handleClearSessionStorage} component={Link} to="/">
                        <LogoutIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={(event) => event.stopPropagation()}
                    onKeyDown={toggleDrawer(false)}
                    sx={{width: 250}}
                >
                    <List>
                        <ListItem button component={Link} to="/Client">
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Página principal"/>
                        </ListItem>
                        <ListItem button component={Link} to="/Client/profile">
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary="Perfil"/>
                        </ListItem>
                        <ListItem button component={Link} to="/Client/history">
                            <ListItemIcon><HistoryIcon/></ListItemIcon>
                            <ListItemText primary="Historial"/>
                        </ListItem>
                        <ListItem button onClick={handleReportMenuClick}>
                            <ListItemIcon><ReportIcon/></ListItemIcon>
                            <ListItemText primary="Reportes"/>
                        </ListItem>
                    </List>
                    <Menu
                        anchorEl={reportMenuAnchorEl}
                        open={Boolean(reportMenuAnchorEl)}
                        onClose={handleReportMenuClose}
                        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'left'}}
                    >
                        <MenuItem component={Link} to={"/Client/reportPayment/" + user.id}
                                  onClick={handleReportMenuClose}>Reporte de pagos</MenuItem>
                        <MenuItem component={Link} to={"/Client/reportConsume/" + user.id}
                                  onClick={handleReportMenuClose}>Reporte de consumos</MenuItem>
                    </Menu>
                </Box>
            </Drawer>
            <div>{children}</div>
        </>
    );
}
