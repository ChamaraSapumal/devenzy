'use client';

import { Product } from '@/types';
import ProductDetails from '@/components/ProductDetails';

export default function ProductDetailsWrapper({ product }: { product: Product }) {
    const handleAddToCart = (product: Product, size: string, color: any) => {
        console.log('Added to cart:', { product, size, color });
    };

    const handleAddToWishlist = (product: Product) => {
        console.log('Added to wishlist:', product);
    };

    return (
        <ProductDetails
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
        />
    );
}
