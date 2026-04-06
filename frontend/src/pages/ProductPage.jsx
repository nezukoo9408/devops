import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Minus, Plus, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, qty);
        navigate('/cart');
    };

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!product) return <div className="p-20 text-center">Product not found</div>;

    return (
        <div className="container mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors"
            >
                <ArrowLeft size={18} />
                Back to Products
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Product Image */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-square object-contain rounded-xl"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">
                            {product.brand}
                        </span>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1 text-yellow-400">
                                <ShieldCheck size={16} /> 4.5 Rating
                            </div>
                            <span>•</span>
                            <span>120 Reviews</span>
                        </div>
                    </div>

                    <div className="text-4xl font-extrabold text-gray-900 mb-8 border-y border-gray-100 py-6">
                        ${product.price}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed italic border-l-4 border-gray-200 pl-4">
                        "{product.description}"
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">Availability</span>
                            <span className={product.countInStock > 0 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                                {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-gray-600 font-medium">Quantity</span>
                                <div className="flex items-center border border-gray-200 rounded-xl bg-white p-1">
                                    <button
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="p-2 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-6 font-bold w-12 text-center">{qty}</span>
                                    <button
                                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                        className="p-2 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 disabled:bg-gray-300 disabled:shadow-none transition-all"
                        >
                            <ShoppingCart size={20} />
                            Add to Bag
                        </button>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <Truck size={20} className="text-primary" />
                            <div className="text-[10px] leading-tight">
                                <p className="font-bold text-gray-800">Fast Shipping</p>
                                <p className="text-gray-500">Free over $100</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <RefreshCw size={20} className="text-primary" />
                            <div className="text-[10px] leading-tight">
                                <p className="font-bold text-gray-800">Easy Returns</p>
                                <p className="text-gray-500">30-day window</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
