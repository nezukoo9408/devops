import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:text-5xl">
                    DevOps-Ready E-Commerce
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    A production-grade application for demonstrating self-healing, multi-cloud deployments, and real-time monitoring.
                </p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20 text-primary">
                    <Loader2 className="animate-spin" size={48} />
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-primary pl-4">
                        Featured Products
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center text-gray-500">
                                <p>No products found. Please seed the database.</p>
                                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg max-w-md mx-auto text-sm border border-yellow-200">
                                    <p className="font-bold mb-1">Dev Note:</p>
                                    <p>Check the backend seed script or ensure the API is running.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
