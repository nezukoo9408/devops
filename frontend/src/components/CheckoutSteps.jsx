import React from 'react';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
                <span className={`text-sm font-medium ${step1 ? 'text-primary' : 'text-gray-400'}`}>Sign In</span>
            </div>
            <div className={`h-[2px] w-8 ${step2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
                <span className={`text-sm font-medium ${step2 ? 'text-primary' : 'text-gray-400'}`}>Shipping</span>
            </div>
            <div className={`h-[2px] w-8 ${step3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                <span className={`text-sm font-medium ${step3 ? 'text-primary' : 'text-gray-400'}`}>Payment</span>
            </div>
            <div className={`h-[2px] w-8 ${step4 ? 'bg-primary' : 'bg-gray-200'}`}></div>
            <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step4 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
                <span className={`text-sm font-medium ${step4 ? 'text-primary' : 'text-gray-400'}`}>Place Order</span>
            </div>
        </div>
    );
};

export default CheckoutSteps;
