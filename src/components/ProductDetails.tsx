"use client";
import React, { useState } from 'react';
import { Star, Heart, Share, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    description: string;
    features: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    images: string[];
    rating: number;
    reviews: { id: number; userName: string; rating: number; comment: string; date: string }[];
}

const ProductDetail = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
    const [isWishlist, setIsWishlist] = useState(false);
    const router = useRouter();

    interface QuantityChangeAction {
        type: 'increase' | 'decrease';
    }

    const handleQuantityChange = (action: QuantityChangeAction) => {
        if (action.type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action.type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsWishlist(!isWishlist)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <Share className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="relative">
                        <Carousel className="w-full">
                            <CarouselContent>
                                {product.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <Card className="border-none shadow-none">
                                            <CardContent className="p-0">
                                                <img
                                                    src={image}
                                                    alt={`${product.name} - View ${index + 1}`}
                                                    className="w-full h-[500px] object-cover rounded-2xl"
                                                />
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </Carousel>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <Badge variant="secondary" className="mb-2">
                                {product.category}
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
                            <div className="flex items-center mt-4 space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < product.rating
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-600">
                                    ({product.reviews.length} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold">
                                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                            <Badge variant={product.inStock ? "success" : "destructive"}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                        </div>

                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="description">Description</TabsTrigger>
                                <TabsTrigger value="features">Features</TabsTrigger>
                                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4">
                                <p className="text-gray-600">{product.description}</p>
                            </TabsContent>
                            <TabsContent value="features" className="mt-4">
                                <ul className="list-disc pl-4 text-gray-600 space-y-2">
                                    {product.features.map((feature, index) => (
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

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {product.sizes.map((size, index) => (
                                        <Button
                                            key={index}
                                            variant={selectedSize === size ? "default" : "outline"}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {product.colors.map((color, index) => (
                                        <Button
                                            key={index}
                                            variant={selectedColor?.name === color.name ? "default" : "outline"}
                                            onClick={() => setSelectedColor(color)}
                                            className="flex items-center gap-2"
                                        >
                                            <span
                                                className="w-4 h-4 rounded-full border"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            {color.name}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleQuantityChange({ type: 'decrease' })}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleQuantityChange({ type: 'increase' })}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button
                                    className="flex-1"
                                    size="lg"
                                    disabled={!product.inStock}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {product.reviews.map((review) => (
                            <Card key={review.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="font-semibold">{review.userName}</p>
                                            <div className="flex items-center mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating
                                                            ? "text-yellow-400 fill-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <time className="text-sm text-gray-500">
                                            {new Date(review.date).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductDetail;