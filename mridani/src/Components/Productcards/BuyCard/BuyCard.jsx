import React from 'react';

const BuyCard = ({ product }) => {
    return (
        <div className="flex items-center gap-6 p-4 mb-4 bg-white hover:shadow-sm transition duration-200">
            <img
                src={product.image_field}
                alt={product.name}
                className="w-20 h-24 object-cover border"
            />

            <div className="flex flex-col justify-between flex-grow">
                <div>
                    <p className="text-base font-medium text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.variant || ""}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-semibold text-gray-900">
                        ₹{product.price?.toLocaleString?.() || "0"}
                    </p>
                    <p className="text-sm text-gray-600">
                        Qty: <span className="font-medium">{product.quantity}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuyCard;
