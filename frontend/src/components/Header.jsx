import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Header = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xs">
                        AZ
                    </div>
                    DevOpsShop
                </Link>

                <nav className="flex items-center gap-6">
                    <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
                        <ShoppingCart size={24} />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                Hi, {userInfo.name}
                            </span>

                            {userInfo.isAdmin && (
                                <Link to="/admin" title="Admin Dashboard" className="text-gray-600 hover:text-primary">
                                    <LayoutDashboard size={20} />
                                </Link>
                            )}

                            <button
                                onClick={logout}
                                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
                        >
                            <User size={18} />
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
