import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, Building2, Globe, Mail, ArrowRight } from 'lucide-react';

const ShippingPage = () => {
    const [address, setAddress] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).address : '');
    const [city, setCity] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).city : '');
    const [postalCode, setPostalCode] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).postalCode : '');
    const [country, setCountry] = useState(localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')).country : '');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <CheckoutSteps step1 step2 />
            
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shipping Address</h1>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                <textarea
                                    required
                                    rows="2"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none resize-none"
                                    placeholder="Enter street address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                    placeholder="New York"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                    placeholder="10001"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                                    placeholder="USA"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            Continue to Payment
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
