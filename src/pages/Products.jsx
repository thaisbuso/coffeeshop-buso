import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import CloseIcon from '@mui/icons-material/Close';

import ProductCard from '../components/ProductCard';

const products = [
    {
        id: 1,
        name: 'Café Expresso',
        price: 7.99,
        description: 'Delicioso café expresso puro com chantilly e canela em pó. Acompanha água com gás e um biscoito de chocolate.', 
        image: '1.jpg'
    },
    {
        id: 2,
        name: 'Capuccino',
        price: 8.99,
        description: 'Xícara de capuccino com raspas de chocolate e canela em pó. Acompanha água com gás e um biscoito de chocolate.',
        image: '3.jpg'
    },
    {
        id: 3,
        name: 'Chocolate Quente',
        price: 14.99,
        description: 'Xícara de chocolate quente com chantilly e canela em pó. Acompanha água com gás e um biscoito de chocolate.',
        image: '4.jpg'
    },
    {
        id: 4,
        name: 'Coxinha',
        price: 6.99,
        description: 'Coxinha de frango com catupiry. Acompanha molho de pimenta e um copo de água com gás.',
        image: '2.jpg'
    }
];

function Products({ }) {
    const [notify, setNotify] = useState(false);

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotify(false);
    };

    function handleAddProduct(){
        setNotify(true);
    }

    return (
        <div className="products">
            <Typography
                variant="h5"
                noWrap
                sx={{ mt: 2, mb: 2 }}
            >
                Cardápio
            </Typography>

            <ul>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} handleAddProduct={handleAddProduct} />
                ))}
            </ul>

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
                    Produto adicionado ao pedido!
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Products;
