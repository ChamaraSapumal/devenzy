// components/ProductDetalis.tsx
"use client";
import React from 'react';
import { Product } from '@/types';
import { Badge } from "@/components/ui/badge";
import ProductGallery from './ProductGallery';
import ProductActions from './ProductActions';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';

interface ProductDetailProps {
    product: Product;
}


const ProductDetail = ({ product }: ProductDetailProps) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images - Client Component */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Product Info Section */}
                    <div className="space-y-6">
                        <div>
                            <Badge variant="secondary" className="mb-2">
                                {product.category}
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>

                            {/* Product Info - Client Component */}
                            <ProductInfo
                                rating={product.rating}
                                reviewCount={product.reviews.length}
                                price={product.price}
                                inStock={product.inStock}
                                description={product.description}
                                features={product.features}
                            />
                        </div>

                        {/* Product Actions - Client Component */}
                        <ProductActions
                            product={product}
                            sizes={product.sizes}
                            colors={product.colors}
                        />
                    </div>
                </div>

                {/* Reviews Section - Client Component */}
                <ProductReviews reviews={product.reviews} />
            </main>
        </div>
    );
};

export default ProductDetail;