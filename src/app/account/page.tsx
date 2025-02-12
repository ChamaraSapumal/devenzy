'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, LogOut, ShoppingBag, Heart, Clock, Home, MapPin, Bell } from 'lucide-react';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { updateProfile } from "firebase/auth";

interface Order {
    id: string;
    date: { seconds: number; nanoseconds: number } | string; // Handle Firebase timestamp
    total: number;
    status: string;
    items: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
    shippingAddress: Address;
}

interface Address {
    id?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
}

interface Notification {
    id: string;
    message: string;
    date: { seconds: number; nanoseconds: number } | string; // Handle Firebase timestamp
    read: boolean;
}

const AccountPage = () => {
    const { user, signInWithGoogle, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [orders, setOrders] = useState<Order[]>([]);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [newAddress, setNewAddress] = useState<Partial<Address>>({});
    const [isAddingAddress, setIsAddingAddress] = useState(false);

    useEffect(() => {
        if (user) {
            fetchOrders();
            fetchAddresses();
            fetchNotifications();
        }
    }, [user]);

    const formatDate = (date: { seconds: number; nanoseconds: number } | string): string => {
        if (typeof date === 'string') return date;
        if (!date?.seconds) return 'Invalid date';
        return new Date(date.seconds * 1000).toLocaleDateString();
    };

    const formatCurrency = (amount: number | undefined): string => {
        if (typeof amount !== 'number') return '$0.00';
        return `$${amount.toFixed(2)}`;
    };

    const fetchOrders = async () => {
        if (!user) return;
        try {
            const ordersRef = collection(db, 'orders');
            const q = query(ordersRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                total: doc.data().total || 0 // Ensure total has a default value
            })) as Order[];
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]); // Set empty array on error
        }
    };

    const fetchAddresses = async () => {
        if (!user) return;
        try {
            const addressesRef = collection(db, 'addresses');
            const q = query(addressesRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const addressesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Address[];
            setAddresses(addressesData);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const fetchNotifications = async () => {
        if (!user) return;
        try {
            const notificationsRef = collection(db, 'notifications');
            const q = query(notificationsRef, where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const notificationsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Notification[];
            setNotifications(notificationsData);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };


    const renderOrders = () => (
        <div className="space-y-6">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border rounded-lg p-6 hover:border-black transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="font-semibold text-lg">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-lg">{formatCurrency(order.total)}</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {order.status || 'Processing'}
                            </span>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Items</h4>
                        <div className="space-y-2">
                            {order.items?.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            )) || <p className="text-sm text-gray-600">No items found</p>}
                        </div>
                    </div>
                    {order.shippingAddress && (
                        <div className="border-t mt-4 pt-4">
                            <h4 className="font-medium mb-2">Shipping Address</h4>
                            <p className="text-sm text-gray-600">
                                {order.shippingAddress.street}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );


    const renderNotifications = () => (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-white border'}`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className={`${notification.read ? 'text-gray-600' : 'font-medium'}`}>
                                {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {formatDate(notification.date)}
                            </p>
                        </div>
                        {!notification.read && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );


    const handleAddAddress = async () => {
        if (!user) return;
        try {
            const addressesRef = collection(db, 'addresses');
            await addDoc(addressesRef, {
                ...newAddress,
                userId: user.uid,
                isDefault: addresses.length === 0
            });
            setIsAddingAddress(false);
            setNewAddress({});
            fetchAddresses();
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleSetDefaultAddress = async (addressId: string) => {
        try {
            const addressesRef = collection(db, 'addresses');
            // Remove default from all addresses
            addresses.forEach(async (address) => {
                if (address.id && address.isDefault) {
                    await updateDoc(doc(addressesRef, address.id), {
                        isDefault: false
                    });
                }
            });
            // Set new default
            await updateDoc(doc(addressesRef, addressId), {
                isDefault: true
            });
            fetchAddresses();
        } catch (error) {
            console.error('Error setting default address:', error);
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await deleteDoc(doc(db, 'addresses', addressId));
            fetchAddresses();
        } catch (error) {
            console.error('Error deleting address:', error);
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
                                    src={user.photoURL || '/placeholder-avatar.png'}
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
                                    onClick={() => setActiveTab('addresses')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'addresses' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <MapPin className="w-5 h-5" />
                                    Addresses
                                </button>
                                <button
                                    onClick={() => setActiveTab('notifications')}
                                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'notifications' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Bell className="w-5 h-5" />
                                    Notifications
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
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={user.photoURL || '/placeholder-avatar.png'}
                                                alt={user.displayName || 'User'}
                                                className="w-24 h-24 rounded-full"
                                            />
                                            <div>
                                                <h3 className="text-xl font-semibold">{user.displayName}</h3>
                                                <p className="text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="border-t pt-6">
                                            <h4 className="font-semibold mb-4">Account Details</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                                    <p className="mt-1">{user.displayName}</p>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                                    <p className="mt-1">{user.email}</p>
                                                </div>
                                            </div>
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
                                    ) : renderOrders()}
                                </div>
                            )}

                            {activeTab === 'addresses' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold">Addresses</h2>
                                        <button
                                            onClick={() => setIsAddingAddress(true)}
                                            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Add New Address
                                        </button>
                                    </div>

                                    {isAddingAddress && (
                                        <div className="mb-6 p-6 border rounded-lg">
                                            <h3 className="font-semibold mb-4">Add New Address</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Street Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.street || ''}
                                                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.city || ''}
                                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.state || ''}
                                                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        ZIP Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newAddress.zipCode || ''}
                                                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                                                        className="w-full border rounded-lg px-3 py-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-4 flex justify-end gap-4">
                                                <button
                                                    onClick={() => {
                                                        setIsAddingAddress(false);
                                                        setNewAddress({});
                                                    }}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleAddAddress}
                                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                                >
                                                    Save Address
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="border rounded-lg p-6">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-medium">
                                                            {address.street}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {address.city}, {address.state} {address.zipCode}
                                                        </p>
                                                        {address.isDefault && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                                                                Default Address
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {!address.isDefault && (
                                                            <button
                                                                onClick={() => address.id && handleSetDefaultAddress(address.id)}
                                                                className="text-sm text-gray-600 hover:text-gray-800"
                                                            >
                                                                Set as Default
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => address.id && handleDeleteAddress(address.id)}
                                                            className="text-sm text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Notifications</h2>
                                    {notifications.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Bell className="w-12 h-12 mx-auto text-gray-400" />
                                            <p className="mt-4 text-gray-600">No notifications</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {notifications.map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-4 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-white border'
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className={`${notification.read ? 'text-gray-600' : 'font-medium'}`}>
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-sm text-gray-500 mt-1">
                                                                {formatDate(notification.date)}
                                                            </p>
                                                        </div>
                                                        {!notification.read && (
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                New
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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