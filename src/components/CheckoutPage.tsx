"use client";

import React, { useState } from 'react';
import { CreditCard, Truck, ChevronRight, UserCheck, HomeIcon, Package, MapPin } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateCartTotals } from '@/utils/cartCalculations';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Replace with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');

interface OrderTrackingInfo {
    orderId: string;
    status: 'processing' | 'shipped' | 'delivered';
    estimatedDelivery: Date;
    trackingNumber?: string;
    shippingMethod?: string;
}

interface CheckoutPageProps {
    cartItems: CartItem[];
}

const CheckoutForm: React.FC<CheckoutPageProps> = ({ cartItems: initialCartItems }) => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const searchParams = useSearchParams();
    const cartData = searchParams.get('cartData');
    const cartItems = cartData ? JSON.parse(cartData) : initialCartItems;

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [orderTracking, setOrderTracking] = useState<OrderTrackingInfo | null>(null);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const generateOrderTracking = (): OrderTrackingInfo => {
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5); // 5 days delivery

        return {
            orderId: uuidv4(),
            status: 'processing',
            estimatedDelivery,
            trackingNumber: `TRACK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            shippingMethod: 'Standard Shipping'
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setPaymentError(null);

        try {
            // Create payment intent on your backend
            const response = await fetch('api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: calculateCartTotals(cartItems).total * 100, // Amount in cents
                    currency: 'usd'
                })
            });

            const { clientSecret } = await response.json();

            // Confirm card payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        address: {
                            city: formData.city,
                            postal_code: formData.postalCode
                        }
                    }
                }
            });

            if (result.error) {
                setPaymentError(result.error.message || 'Payment failed');
                setIsProcessing(false);
            } else {
                // Generate order tracking info
                const orderInfo = generateOrderTracking();
                setOrderTracking(orderInfo);

                // Save order to Firestore
                const orderRef = await addDoc(collection(db, 'orders'), {
                    ...orderInfo,
                    customerInfo: formData,
                    items: cartItems,
                    createdAt: Timestamp.now()
                });

                // Redirect to order confirmation
                router.push(`/order-confirmation?orderId=${orderInfo.orderId}`);
            }
        } catch (error) {
            setPaymentError('An unexpected error occurred');
            setIsProcessing(false);
        }
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
                                        <label className="block text-sm font-medium mb-1">Card Details</label>
                                        <CardElement
                                            options={{
                                                style: {
                                                    base: {
                                                        fontSize: '16px',
                                                        color: '#424770',
                                                        '::placeholder': {
                                                            color: '#aab7c4',
                                                        },
                                                    },
                                                    invalid: {
                                                        color: '#9e2146',
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {paymentError && (
                                <div className="text-red-500 text-sm mb-4">{paymentError}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                {isProcessing ? 'Processing...' : 'Complete Order'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="w-full mt-4 bg-gray-200 text-black py-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-4"
                            >
                                Go Back Home
                                <HomeIcon className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Order Tracking Section */}
                    {orderTracking && (
                        <div className="max-w-6xl mx-auto px-4 mt-8">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <Package className="mr-2" /> Order Tracking
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-medium flex items-center">
                                            <MapPin className="mr-2 text-blue-500" />
                                            Order ID: {orderTracking.orderId}
                                        </p>
                                        <p className="flex items-center">
                                            <Truck className="mr-2 text-green-500" />
                                            Status: {orderTracking.status.charAt(0).toUpperCase() + orderTracking.status.slice(1)}
                                        </p>
                                        <p>
                                            Tracking Number: {orderTracking.trackingNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p>
                                            Shipping Method: {orderTracking.shippingMethod}
                                        </p>
                                        <p>
                                            Estimated Delivery: {orderTracking.estimatedDelivery.toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm cartItems={cartItems} />
        </Elements>
    );
};

export default CheckoutPage;