import { CartItem } from '@/types';

export const calculateCartTotals = (cartItems: CartItem[]) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 10; // Fixed shipping cost
  const total = subtotal + shipping;

  return {
    subtotal,
    shipping,
    total,
  };
};