import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Users, ShoppingCart, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const stats = [
        { label: 'Total Sales', value: `$${orders.reduce((acc, o) => acc + o.totalPrice, 0).toFixed(0)}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Orders', value: orders.length, icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Users', value: '12', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Products', value: '8', icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500">Overview of your shop's performance</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm">
                    Node: K8S-Cluster-01
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                    <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-8 py-4">Order ID</th>
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4">Total</th>
                                <th className="px-8 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-10 text-center text-gray-500 italic">
                                        No orders placed yet.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-8 py-4 font-mono text-xs text-gray-400 capitalize">
                                            {order._id.substring(order._id.length - 8)}
                                        </td>
                                        <td className="px-8 py-4">
                                            <p className="font-bold text-gray-900">{order.user?.name || 'Guest'}</p>
                                            <p className="text-xs text-gray-500">{order.user?.email}</p>
                                        </td>
                                        <td className="px-8 py-4 text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-4 font-bold text-gray-900">${order.totalPrice.toFixed(2)}</td>
                                        <td className="px-8 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.isPaid ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {order.isPaid ? 'Paid' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
