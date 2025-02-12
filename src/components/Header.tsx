"use client";

import React, { useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart, Heart, Search, Menu, X, User, Building2 } from "lucide-react";
import debounce from 'lodash/debounce';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
    cartItems: { quantity: number }[];
    onOpenCart: () => void;
    onOpenWishlist: () => void;
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems = [], onOpenCart, onOpenWishlist, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const debouncedSearch = useCallback(
        debounce((query) => {
            if (onSearch) {
                onSearch(query);
            }
            if (pathname !== '/') {
                router.push(`/?search=${encodeURIComponent(query)}`);
            }
        }, 300),
        [onSearch, pathname, router]
    );

    interface SearchChangeEvent extends React.ChangeEvent<HTMLInputElement> { }

    const handleSearchChange = (e: SearchChangeEvent) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 space-y-4">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full"
                            />
                            <nav className="space-y-2">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.push("/categories")}
                                >
                                    Categories
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.push("/new-arrivals")}
                                >
                                    New Arrivals
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.push("/sale")}
                                >
                                    Sale
                                </Button>
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex items-center gap-4">
                    <h1
                        onClick={() => router.push("/")}
                        className="text-xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        Fashion Shop
                    </h1>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center px-6">
                    <div className="w-full max-w-md relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full pl-10 bg-secondary"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="hidden md:flex"
                        onClick={onOpenWishlist}
                    >
                        <Heart className="h-5 w-5" />
                        <span className="sr-only">Wishlist</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={onOpenCart}
                    >
                        <ShoppingCart className="h-5 w-5" />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center">
                                {cartItemsCount}
                            </span>
                        )}
                        <span className="sr-only">Cart</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/account")}
                    >
                        <User className="h-5 w-5" />
                        <span className="sr-only">Account</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push("/admin/login")}
                    >
                        <Building2 className="h-5 w-5" />
                        <span className="sr-only">Admin</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;