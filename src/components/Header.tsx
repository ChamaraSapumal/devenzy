"use client"; // Required for client-side navigation

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { CartItem } from "@/types";

interface HeaderProps {
    cartItems: CartItem[];
    onOpenCart: () => void;
    onOpenWishlist: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, onOpenCart, onOpenWishlist }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); // Next.js navigation

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and mobile menu */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h1 className="text-xl font-bold">Fashion Shop</h1>
                    </div>

                    {/* Search bar - hidden on mobile */}
                    <div className="hidden md:block flex-1 max-w-md mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button onClick={onOpenWishlist} className="p-2 hover:bg-gray-100 rounded-full">
                            <Heart className="w-6 h-6" />
                        </button>
                        <button onClick={onOpenCart} className="p-2 hover:bg-gray-100 rounded-full relative">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                        <button
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={() => router.push("/account")} // Navigate to user account page
                        >
                            <User className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="p-4 space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
