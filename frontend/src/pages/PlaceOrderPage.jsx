import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckoutSteps from '../components/CheckoutSteps';
import { CartContext } from '../context/CartContext';
import { MapPin, Wallet, Package, AlertCircle } from 'lucide-react';

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useContext(CartContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            });
            clearCart();
            navigate(`/order/${data.id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <CheckoutSteps step1 step2 step3 step4 />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <MapPin size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Shipping Details</h2>
                        </div>
                        <p className="text-gray-600 ml-14">
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <Wallet size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                        </div>
                        <p className="text-gray-600 ml-14">
                            <strong>Method: </strong>
                            {paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <Package size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            {cartItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                                    <div className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded" />
                                        <Link to={`/product/${item.product}`} className="text-sm font-medium hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {item.qty} x ${item.price} = <strong>${(item.qty * item.price).toFixed(2)}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Items</span>
                                <span className="font-bold text-gray-900">${itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-bold text-gray-900">${shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span className="font-bold text-gray-900">${taxPrice.toFixed(2)}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-100 flex justify-between">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-extrabold text-primary">${totalPrice}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <button
                            disabled={cartItems.length === 0 || loading}
                            onClick={placeOrderHandler}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 disabled:bg-gray-300 transition-all"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
