import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group">
            <Link to={`/product/${product.id}`}>
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </Link>

            <div className="p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {product.category}
                </div>
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">(4.5)</span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Link
                        to={`/product/${product.id}`}
                        className="p-2 bg-gray-50 text-primary rounded-lg group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                        <ShoppingCart size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
