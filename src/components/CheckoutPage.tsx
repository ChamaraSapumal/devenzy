"use client";

import React, { useState } from 'react';
import { CreditCard, Truck, ChevronRight, UserCheck, HomeIcon } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateCartTotals } from '@/utils/cartCalculations';


interface CheckoutPageProps {
    cartItems: CartItem[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems: initialCartItems }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartData = searchParams.get('cartData');
    const cartItems = cartData ? JSON.parse(cartData) : initialCartItems;

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle checkout logic here
        console.log('Form submitted:', formData);
    };

    const { subtotal, shipping, total } = calculateCartTotals(cartItems);


    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main checkout form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <span className="p-2 bg-black text-white rounded-full text-sm">1</span>
                                        Contact Information
                                        <UserCheck className="w-5 h-5 ml-2" />
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Information */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <span className="p-2 bg-black text-white rounded-full text-sm">2</span>
                                        Shipping Information
                                        <Truck className="w-5 h-5 ml-2" />
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold flex items-center gap-2">
                                        <span className="p-2 bg-black text-white rounded-full text-sm">3</span>
                                        Payment Information
                                        <CreditCard className="w-5 h-5 ml-2" />
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                            placeholder="**** **** **** ****"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">CVV</label>
                                            <input
                                                type="text"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                                                placeholder="***"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Complete Order
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/devenzy/')}
                                className="w-full bg-gray-200 text-black py-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-4"
                            >
                                Go Back Home
                                <HomeIcon className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item: CartItem) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.product.name}</h4>
                                            <p className="text-sm text-gray-600">Color: {item.selectedColor.name}</p>
                                            <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;