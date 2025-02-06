'use client';

import { products } from '@/data/products';
import ProductDetails from '@/components/ProductDetails';
import { notFound } from 'next/navigation';
import { Product, Color } from '@/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise); // ✅ Unwrapping params using React.use()

    const product = products.find(p => p.id === params.id);
    if (!product) return notFound();

    const handleAddToCart = (product: Product, size: string, color: Color) => {
        console.log('Added to cart:', { product, size, color });
    };

    const handleAddToWishlist = (product: Product) => {
        console.log('Added to wishlist:', product);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Back button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-black">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-black">{product.name}</span>
                </div>

                <ProductDetails
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                />
            </div>
        </div>
    );
}
