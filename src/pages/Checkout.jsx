import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import RequireAuth from '../components/auth/RequireAuth';

import { useLocalStorage } from '../hooks/useLocalStorage';

function Checkout({ socket }) {
    const [savedOrder, setSavedOrder] = useLocalStorage("order", "");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const order = JSON.parse(savedOrder);

        socket.emit('pedido', {
            address: {
                address1: data.get('address1'),
                address2: data.get('address2'),
                city: data.get('city'),
                state: data.get('state'),
                zip: data.get('zip'),
            },
            order: order
        });

        setTimeout(() => {
            window.location.href = `/`;
        }, 3000);
    };

    return (
        <RequireAuth>
            <div className="checkout">
                <Typography variant="h6" gutterBottom>
                    Endereço de recebimento
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="address1"
                                name="address1"
                                label="Linha 1"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                name="address2"
                                label="Linha 2"
                                fullWidth
                                autoComplete="shipping address-line2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="Cidade"
                                fullWidth
                                autoComplete="shipping address-level2"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="state"
                                name="state"
                                label="Estado"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="zip"
                                name="zip"
                                label="CEP"
                                fullWidth
                                autoComplete="shipping postal-code"
                                variant="standard"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Pedir
                    </Button>
                </Box>
            </div>
        </RequireAuth>
    );
}

export default Checkout;