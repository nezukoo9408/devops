import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="min-h-screen bg-slate-50 flex flex-col">
                        <Header />
                        <main className="flex-grow pb-20">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/product/:id" element={<ProductPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/shipping" element={<ShippingPage />} />
                                <Route path="/payment" element={<PaymentPage />} />
                                <Route path="/placeorder" element={<PlaceOrderPage />} />
                                <Route path="/order/:id" element={<OrderPage />} />
                                <Route path="/admin" element={<AdminDashboard />} />
                            </Routes>
                        </main>
                        <footer className="py-8 bg-white border-t border-gray-100">
                            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
                                &copy; {new Date().getFullYear()} DevOpsShop. All rights reserved. Built for Multi-Cloud Self-Healing Demo.
                            </div>
                        </footer>
                    </div>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;
