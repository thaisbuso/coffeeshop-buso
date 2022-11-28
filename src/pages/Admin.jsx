import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import RequireAuth from '../components/auth/RequireAuth';

function Admin({ socket }) {
    const [orderList, setOrderList] = useState([]);

    function handleDelete(index) {
        const newOrderList = orderList.filter((item, i) => i !== index);
        setOrderList(newOrderList);
    }

    useEffect(() => {
        socket.on('pedido', (data) => {
            console.log("pedido", data);
            setOrderList((orderList) => [...orderList, data]);
        });

        socket.on('pedido-mesa', (data) => {
            console.log("pedido-mesa", data);
            setOrderList((orderList) => [...orderList, data]);
        });

        socket.on('atendente-mesa', (data) => {
            console.log("atendente-mesa", data);
            setOrderList((orderList) => [...orderList, data]);
        });

        return () => {
            socket.off('pedido');
            socket.off('pedido-mesa');
            socket.off('atendente-mesa');
        };
    }, []);

    return (
        <RequireAuth>
            <div className="admin">
                <Typography
                    variant="h5"
                    noWrap
                    sx={{ mt: 2, mb: 2 }}
                >
                    Pedidos
                </Typography>


                <Grid container spacing={3}>
                    {orderList.map((orderItem, index) => (
                        <Grid item xs={12} key={index}>
                            <div className="order">
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{}}
                                >
                                    {orderItem.address ? "Entrega" : orderItem.table}
                                </Typography>

                                {orderItem.address && (
                                    <Typography
                                        variant="body1"
                                    >
                                        <span>
                                            {orderItem.address.address1} {orderItem.address.address2} - {orderItem.address.city}, {orderItem.address.state} - {orderItem.address.zip}
                                        </span>
                                    </Typography>
                                )}

                                {orderItem.order && (
                                    <Typography
                                        variant="body1"
                                        noWrap
                                        sx={{ textAlign: 'left', mb: 1}}
                                    >
                                        {orderItem?.order?.map((item, index) => (
                                            <span style={{ display: "block" }} key={index}>{item.quantity}x {item.product.name}</span>
                                        ))}
                                    </Typography>
                                )}

                                { (!orderItem.address && !orderItem.order) && (
                                    <Typography
                                        variant="body1"
                                        noWrap
                                        sx={{ mb: 2 }}
                                    >
                                        Atendente solicitado na mesa
                                    </Typography>
                                )}

                                <Button variant="contained" sx={{ fontSize: 13 }} onClick={() => { handleDelete(index) }}>Atendido</Button>
                            </div>
                        </Grid>
                    ))}
                </Grid>

            </div>
        </RequireAuth>
    );
}

export default Admin;