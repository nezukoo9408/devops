import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Package, MapPin, Wallet, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

const OrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${id}`);
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch order');
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="flex items-center justify-center py-40 text-primary"><Loader2 className="animate-spin" size={48} /></div>;
    if (error) return <div className="container mx-auto px-4 py-20 text-center text-red-500 bg-red-50 rounded-2xl border border-red-100">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Details</h1>
                    <p className="text-gray-500 font-medium">Order ID: <span className="text-primary">{order.id}</span></p>
                </div>
                <div className="flex items-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-2xl border border-green-100 font-bold">
                    <CheckCircle2 size={24} />
                    Order Placed Successfully
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <MapPin size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Shipping</h2>
                        </div>
                        <div className="ml-14 space-y-2">
                            <p className="text-gray-900 font-bold">{order.User.name} ({order.User.email})</p>
                            <p className="text-gray-600">
                                Address details should be stored in order object in more complex apps. 
                                For this demo, we use the shared account address.
                            </p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <Wallet size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Payment</h2>
                        </div>
                        <div className="ml-14">
                            <p className="text-gray-900"><strong>Method: </strong>{order.paymentMethod}</p>
                            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm inline-block border border-green-100">
                                Paid on {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 text-primary rounded-xl">
                                <Package size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                        </div>
                        <div className="ml-14 space-y-4">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between py-4 border-b last:border-0 border-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div>
                                            <Link to={`/product/${item.ProductId}`} className="font-bold text-gray-900 hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                            <p className="text-xs text-gray-400 mt-1">{item.qty} x ${item.price}</p>
                                        </div>
                                    </div>
                                    <div className="font-extrabold text-gray-900">
                                        ${(item.qty * item.price).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Items</span>
                                <span className="font-bold text-gray-900">${order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-bold text-gray-900">${order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span className="font-bold text-gray-900">${order.taxPrice}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-extrabold text-primary">${order.totalPrice}</span>
                            </div>
                        </div>

                        <Link
                            to="/"
                            className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all border border-gray-100"
                        >
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
