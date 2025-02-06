"use client";
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Header from './Header';
import ProductCard from './ProductCard';
import { products, categories } from '@/data/products';
import { Product, CartItem } from '@/types';

const FashionShop: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existingItem = prev.find(
                item => item.product.id === product.id
            );

            if (existingItem) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, {
                product,
                quantity: 1,
                selectedSize: product.sizes[0],
                selectedColor: product.colors[0]
            }];
        });
        setIsCartOpen(true);
    };

    const addToWishlist = (product: Product) => {
        setWishlist(prev =>
            prev.includes(product.id)
                ? prev.filter(id => id !== product.id)
                : [...prev, product.id]
        );
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                cartItems={cartItems}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenWishlist={() => { }}
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Categories */}
                <div className="mb-8 overflow-x-auto">
                    <div className="flex gap-4">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category.id
                                    ? 'bg-black text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                            onAddToWishlist={addToWishlist}
                        />
                    ))}
                </div>
            </main>

            {/* Cart sidebar */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                    <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <FaTimes className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto">
                            {cartItems.length === 0 ? (
                                <p className="text-center text-gray-500">Your cart is empty</p>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div
                                            key={item.product.id}
                                            className="flex gap-4 bg-white p-4 rounded-lg"
                                        >
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{item.product.name}</h3>
                                                <p className="text-gray-600">
                                                    ${item.product.price * item.quantity}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        className="p-1 rounded-full hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="p-1 rounded-full hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="ml-auto text-red-500 hover:text-red-600"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t p-4 bg-white">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>Total</span>
                                        <span>
                                            ${cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => {/* Implement checkout */ }}
                                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FashionShop;