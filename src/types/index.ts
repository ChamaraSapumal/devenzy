export type Product = {
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
    reviews: Review[];
  };
  
  export type Color = {
    name: string;
    hex: string;
  };
  
  export type Review = {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  };
  
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