import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                        <ShoppingBag size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.product}
                                className="bg-white p-4 rounded-2xl flex items-center gap-6 shadow-sm border border-gray-100"
                            >
                                <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                </div>

                                <div className="flex-grow">
                                    <Link
                                        to={`/product/${item.product}`}
                                        className="font-bold text-gray-900 hover:text-primary transition-colors text-lg"
                                    >
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                                    <p className="font-extrabold text-primary">${item.price}</p>
                                </div>

                                <div className="flex items-center border border-gray-200 rounded-lg p-1 bg-gray-50">
                                    <button
                                        onClick={() => addToCart(item, Math.max(1, item.qty - 1))}
                                        className="p-1 hover:text-primary transition-colors"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                                    <button
                                        onClick={() => addToCart(item, Math.min(item.countInStock, item.qty + 1))}
                                        className="p-1 hover:text-primary transition-colors"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.product)}
                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span className="font-bold text-gray-900">${subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold">FREE</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-extrabold text-primary">${subtotal}</span>
                                </div>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all"
                            >
                                Checkout
                                <ArrowRight size={20} />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
