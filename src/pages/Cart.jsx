import React, { useState, useEffect } from 'react';

import RequireMode from '../components/mode/RequireMode';

import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';

import { useMode } from '../hooks/useMode';
import { useCart } from '../hooks/useCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Cart({ socket }) {
    const { mode, table } = useMode();
    const { getCart } = useCart();

    const [savedOrder, setSavedOrder] = useLocalStorage("order", "");

    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0.00);

    const [notify, setNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState('');

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify(false);
    };

    function handleNotify(message){
        setNotifyMessage(message);
        setNotify(true);
    }

    function handleCallWaiter() {
        handleNotify(`Atendente solicitado na ${table}`);
        socket.emit('atendente-mesa', {
            table: table
        });
    }

    function handleOrderTable() {
        socket.emit('pedido-mesa', {
            table: table,
            order: order
        });

        handleNotify(`Comanda atualizada na ${table}`);
    }

    function handleOrderDelivery() {
        setSavedOrder(JSON.stringify(order));
        window.location.href = '/confirma';
    }

    useEffect(() => {
        if (cart && cart.length > 0) {
            let total = 0.00;
            const newOrder = cart.reduce((order, product) => {
                const item = order.find(item => item.product.id === product.id);
                if (item) {
                    item.quantity++;
                } else {
                    order.push({
                        product,
                        quantity: 1
                    });
                }
                total += product.price;

                return order;
            }, []);

            setTotalPrice(total);
            setOrder(newOrder);
        }
    }, [cart]);

    useEffect(() => {
        setCart(getCart());
    }, []);

    return (
        <RequireMode>
            <div className="cart">
                <Typography
                    variant="h5"
                    noWrap
                    sx={{ mt: 2, mb: 2 }}
                >
                    Pedido {mode === 'table' ? `(${table})` : ''}
                </Typography>

                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="center">Qtd.</TableCell>
                                <TableCell align="right">Preço (u)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.map(item => (
                                <TableRow
                                    key={item.product.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.product.name}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="right">R${item.product.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography noWrap sx={{ mt: 2, mb: 2, textAlign: 'right' }}>
                    <b>Total</b>: R${totalPrice.toFixed(2)}
                </Typography>

                <div className="button-group">

                    {mode === 'table' && (
                        <>
                            <Button variant="contained" sx={{ fontSize: 13 }} onClick={handleCallWaiter}>Chamar atendente</Button>
                            <Button variant="contained" sx={{ fontSize: 13 }} onClick={handleOrderTable}>Pedir na {table}</Button>
                        </>
                    )}

                    {mode === 'delivery' && (
                        <Button variant="contained" sx={{ fontSize: 13 }} onClick={handleOrderDelivery}>Pedir delivery</Button>
                    )}
                </div>

                <Snackbar
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    open={notify}
                    autoHideDuration={4000}
                    onClose={handleCloseNotification}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleCloseNotification}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <Alert onClose={handleCloseNotification} severity="success" sx={{ width: '100%' }}>
                        {notifyMessage}
                    </Alert>
                </Snackbar>

            </div>
        </RequireMode>
    );
}

export default Cart;