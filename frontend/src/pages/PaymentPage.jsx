import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { CreditCard, Wallet, ArrowRight } from 'lucide-react';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <CheckoutSteps step1 step2 step3 />
            
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Payment Method</h1>
                    
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-4">
                            <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'PayPal' ? 'border-primary bg-blue-50 ring-2 ring-primary/20' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${paymentMethod === 'PayPal' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <Wallet size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">PayPal or Credit Card</p>
                                        <p className="text-sm text-gray-500">Secure payment via PayPal</p>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    className="w-5 h-5 text-primary focus:ring-primary"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>

                            <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'Stripe' ? 'border-primary bg-blue-50 ring-2 ring-primary/20' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-lg ${paymentMethod === 'Stripe' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900">Stripe</p>
                                        <p className="text-sm text-gray-500">Standard credit card payment</p>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    className="w-5 h-5 text-primary focus:ring-primary"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === 'Stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            Continue to Review
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
