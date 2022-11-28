import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';

import CoffeeIcon from '@mui/icons-material/Coffee';
import MenuIcon from '@mui/icons-material/Menu';

import { useCart } from '../../hooks/useCart';

import ReceiptIcon from '@mui/icons-material/Receipt';

function Topbar({ toggleDrawer }) {

    const { getCart, addProduct } = useCart();

    return (
        <AppBar position="fixed">
            <Toolbar>

                <div className="topbar">
                    <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>

                    <div className="brand">
                        <CoffeeIcon sx={{ mr: 1 }} />

                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            CAFETERIA BUSO
                        </Typography>
                    </div>

                    <Link color="#fff" component={RouterLink} to="/pedidos">
                        <Badge edge="end" badgeContent={getCart().length} color="warning">
                            <ReceiptIcon color="#fff" />
                        </Badge>
                    </Link>
                </div>

            </Toolbar>
        </AppBar>
    );
}

export default Topbar;



