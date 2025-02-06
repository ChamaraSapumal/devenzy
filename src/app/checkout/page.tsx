"use client";

import CheckoutPage from '@/components/CheckoutPage';

import { CartItem } from '@/types';

export default function CheckoutRoute() {
    const cartItems: CartItem[] = []; // Replace with actual cart items
    return <CheckoutPage cartItems={cartItems} />;
}