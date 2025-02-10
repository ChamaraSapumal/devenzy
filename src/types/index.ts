export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: Color[];
  inStock: boolean;
  features: string[];
  rating: number;
  reviews: string[];
}
  export type Color = {
    name: string;
    hex: string;
  };
  
  export interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }
  
  export type CartItem = {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: Color;
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    wishlist: string[];
    cart: CartItem[];
  };

  export interface AdminUser {
    uid: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
  }