import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TableBarIcon from '@mui/icons-material/TableBar';
import SettingsIcon from '@mui/icons-material/Settings';

import { useAuth } from '../../hooks/useAuth';
import { useMode } from '../../hooks/useMode';

function Sidebar({ toggleDrawer, navigationOpen }) {
    const { mode, setMode, table, setTable } = useMode();
    const { user, signout } = useAuth();

    console.log("USER", user);

    function handleSignout() {
        signout();
    }

    function handleSetMode(mode) {
        setMode(mode);
        if(mode === null){
            setTable("");
        }
        window.location.href = `/selecao?redirect=/pedidos`;
    }

    return (
        <Drawer
            open={navigationOpen}
            onClose={toggleDrawer(false)}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon><MenuBookIcon /></ListItemIcon>
                            <ListItemText primary="Cardápio" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/pedidos">
                            <ListItemIcon><ReceiptIcon /></ListItemIcon>
                            <ListItemText primary="Pedidos" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {(mode === 'delivery') && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSetMode(null)}>
                                <ListItemIcon><TableBarIcon /></ListItemIcon>
                                <ListItemText primary="Atendimento na mesa" />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {(mode === 'table') && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSetMode('delivery')}>
                                <ListItemIcon><LocalShippingIcon /></ListItemIcon>
                                <ListItemText primary="Pedir Delivery" />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {(mode !== null) && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleSetMode(null)}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary={`Resetar${ (table !== "") ? ` (${table})` : '' }`} />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {user && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleSignout}>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </ListItem>
                    )}

                    {!user && (
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/login">
                                <ListItemIcon><LoginIcon /></ListItemIcon>
                                <ListItemText primary="Entrar" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;

