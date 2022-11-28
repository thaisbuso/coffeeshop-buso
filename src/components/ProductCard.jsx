import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useCart } from '../hooks/useCart';

function ProductCard({ product, handleAddProduct }) {
    const { addProduct } = useCart();

    function handleAddToCart() {
        addProduct(product);
        handleAddProduct(product);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="200"
                image={`/img/${product.image}`}
                alt="foto do produto"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions 
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pl: 2,
                    pr: 2
                }}
            >
                <Typography>R${product.price}</Typography>
                <Button size="small" onClick={handleAddToCart}>Adicionar</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;