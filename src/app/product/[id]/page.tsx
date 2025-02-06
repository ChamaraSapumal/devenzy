import { products } from '@/data/products';
import ProductDetailsWrapper from './ProductDetailsWrapper';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate static paths
export function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

// Unwrap params using await
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Unwrap params before accessing id
    const product = products.find(p => p.id === id);

    if (!product) {
        return notFound();
    }

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

                {/* Pass product data to the Client Component */}
                <ProductDetailsWrapper product={product} />
            </div>
        </div>
    );
}
