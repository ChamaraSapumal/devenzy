'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut, ShoppingBag, Heart, Clock, Home } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { updateProfile } from "firebase/auth";

interface Order {
    id: string;
    date: string;
    total: number;
    status: string;
}


const AccountPage = () => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    useEffect(() => {
        if (user && !user.photoURL) {
            updateProfile(user, {
                photoURL: user.providerData[0]?.photoURL || ''
            }).then(() => console.log("Profile updated!"));
        }
    }, [user]);

    const fetchOrders = async () => {
        if (!user) return;

        try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);

            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order[];

            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                    <div className="text-center">
                        <User className="w-16 h-16 mx-auto text-gray-400" />
                        <h2 className="mt-4 text-2xl font-bold">Sign In to Your Account</h2>
                        <p className="mt-2 text-gray-600">Access your orders, wishlist, and settings</p>
                    </div>
                    <button
                        onClick={signInWithGoogle}
                        className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={user.photoURL || 'https://via.placeholder.com/40'}
                                    alt={user.displayName || 'User'}
                                    className="w-12 h-12 rounded-full"
                                />

                                <div>
                                    <h2 className="font-semibold">{user.displayName}</h2>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'profile' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="w-5 h-5" />
                                    Profile
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'orders' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab('wishlist')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'wishlist' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Heart className="w-5 h-5" />
                                    Wishlist
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Settings className="w-5 h-5" />
                                    Settings
                                </button>
                                <Link
                                    href="/"
                                    className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                                >
                                    <Home className="w-5 h-5" />
                                    Home
                                </Link>

                                <button
                                    onClick={signOut}
                                    className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Profile</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <p className="mt-1 text-gray-900">{user.displayName}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <p className="mt-1 text-gray-900">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Orders</h2>
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
                                            <p className="mt-4 text-gray-600">No orders yet</p>
                                            <Link
                                                href="/"
                                                className="mt-4 inline-block text-black hover:underline"
                                            >
                                                Start shopping
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div
                                                    key={order.id}
                                                    className="border rounded-lg p-4 hover:border-black transition-colors"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-semibold">Order #{order.id}</p>
                                                            <p className="text-sm text-gray-600">{order.date}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold">${order.total}</p>
                                                            <p className="text-sm text-gray-600">{order.status}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'wishlist' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                                    <div className="text-center py-12">
                                        <Heart className="w-12 h-12 mx-auto text-gray-400" />
                                        <p className="mt-4 text-gray-600">Your wishlist is empty</p>
                                        <Link
                                            href="/"
                                            className="mt-4 inline-block text-black hover:underline"
                                        >
                                            Discover products
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Settings</h2>
                                    {/* Add settings options here */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;