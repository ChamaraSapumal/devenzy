// ProductInfo.tsx
'use client';

import { Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface ProductInfoProps {
    rating: number;
    reviewCount: number;
    price: number;
    inStock: boolean;
    description: string;
    features: string[];
}

const StarRating = ({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
        ))}
    </div>
);

const ProductInfo = ({
    rating,
    reviewCount,
    price,
    inStock,
    description,
    features
}: ProductInfoProps) => (
    <div className="space-y-4">
        <div className="flex items-center mt-4 space-x-2">
            <StarRating rating={rating} />
            <span className="text-gray-600">
                ({reviewCount} reviews)
            </span>
        </div>

        <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">
                ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <Badge variant={inStock ? "success" : "destructive"}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </Badge>
        </div>

        <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
                <ul className="list-disc pl-4 text-gray-600 space-y-2">
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </TabsContent>
            <TabsContent value="shipping" className="mt-4">
                <p className="text-gray-600">
                    Free shipping on orders over $100. Estimated delivery: 3-5 business days
                </p>
            </TabsContent>
        </Tabs>
    </div>
);

export default ProductInfo;