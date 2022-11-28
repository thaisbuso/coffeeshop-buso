import React, { useState, useEffect, useContext, createContext } from 'react'

import { useLocalStorage } from './useLocalStorage';

const cartContext = createContext(null);

export function ProvideCart({ children }) {
    const cart = useProvideCart()
    return <cartContext.Provider value={cart}>{children}</cartContext.Provider>
}

export const useCart = () => {
    return useContext(cartContext);
};

function useProvideCart() {
    const [cartLocalStorage, setCartLocalStorage] = useLocalStorage("cart", "[]");

    function getCart() {
        return JSON.parse(cartLocalStorage);
    }

    function setCart(cart){
        setCartLocalStorage(JSON.stringify(cart));
    }

    function addProduct(product) {
        const cart = getCart();
        cart.push(product);
        setCart(cart);
    }

    useEffect(() => {

    }, [cartLocalStorage]);

    return {
        getCart,
        addProduct
    };
}