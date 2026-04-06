import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cartItems');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error parsing cartItems from localStorage:', error);
            localStorage.removeItem('cartItems');
            return [];
        }
    });

    const addToCart = (product, qty) => {
        const productId = product.id || product._id;
        const existItem = cartItems.find((x) => x.product === productId);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product === existItem.product ? { ...product, product: productId, qty } : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, product: productId, qty }]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter((x) => x.product !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
