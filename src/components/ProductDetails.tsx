"use client";
import React, { useState } from 'react';
import { Star, Heart, Share, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ShareProduct from './ShareProduct';
import { Product, Color } from '@/types';
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
import { ErrorBoundary } from 'react-error-boundary';

interface ProductDetailProps {
    product: Product;
}

// Extract StarRating into a separate client component
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

// Extract QuantitySelector into a separate client component
const QuantitySelector = ({
    quantity,
    onIncrease,
    onDecrease
}: {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}) => (
    <div className="flex items-center border rounded-lg">
        <Button
            variant="ghost"
            size="icon"
            onClick={onDecrease}
            disabled={quantity <= 1}
        >
            <Minus className="w-4 h-4" />
        </Button>
        <span className="w-12 text-center">{quantity}</span>
        <Button
            variant="ghost"
            size="icon"
            onClick={onIncrease}
        >
            <Plus className="w-4 h-4" />
        </Button>
    </div>
);

// Extract ColorSelector into a separate client component
const ColorSelector = ({
    colors,
    selectedColor,
    onColorSelect
}: {
    colors: Color[];
    selectedColor: Color | null;
    onColorSelect: (color: Color) => void;
}) => (
    <div className="grid grid-cols-4 gap-2">
        {colors.map((color, index) => (
            <Button
                key={index}
                variant={selectedColor?.name === color.name ? "default" : "outline"}
                onClick={() => onColorSelect(color)}
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
);

// Extract SizeSelector into a separate client component
const SizeSelector = ({
    sizes,
    selectedSize,
    onSizeSelect
}: {
    sizes: string[];
    selectedSize: string;
    onSizeSelect: (size: string) => void;
}) => (
    <div className="grid grid-cols-4 gap-2">
        {sizes.map((size, index) => (
            <Button
                key={index}
                variant={selectedSize === size ? "default" : "outline"}
                onClick={() => onSizeSelect(size)}
            >
                {size}
            </Button>
        ))}
    </div>
);

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
    const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors[0] || null);
    const [isWishlist, setIsWishlist] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const router = useRouter();

    const handleQuantityChange = (action: 'increase' | 'decrease') => {
        if (action === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (action === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor) return;

        setIsAddingToCart(true);
        try {
            // Add your cart logic here
            const cartItem = {
                product,
                quantity,
                selectedSize,
                selectedColor,
            };
            // await addToCart(cartItem);
        } catch (error) {
            console.error('Failed to add to cart:', error);
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                onClick={() => setIsWishlist(!isWishlist)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <Heart
                                    className={`w-5 h-5 ${isWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                                />
                            </Button>
                            <ShareProduct product={product} url={window.location.href} />
                        </div>
                    </div>
                </div>
            </nav>

            <ErrorBoundary fallback={<div className="text-center py-8">Something went wrong. Please try refreshing the page.</div>}>
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
                                    <StarRating rating={product.rating} />
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
                                    <SizeSelector
                                        sizes={product.sizes}
                                        selectedSize={selectedSize}
                                        onSizeSelect={setSelectedSize}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                                    <ColorSelector
                                        colors={product.colors}
                                        selectedColor={selectedColor}
                                        onColorSelect={setSelectedColor}
                                    />
                                </div>

                                <div className="flex items-center space-x-4">
                                    <QuantitySelector
                                        quantity={quantity}
                                        onIncrease={() => handleQuantityChange('increase')}
                                        onDecrease={() => handleQuantityChange('decrease')}
                                    />
                                    <Button
                                        className="flex-1"
                                        size="lg"
                                        disabled={!product.inStock || isAddingToCart || !selectedSize || !selectedColor}
                                        onClick={handleAddToCart}
                                    >
                                        {isAddingToCart ? (
                                            <span className="flex items-center">
                                                <span className="animate-spin mr-2">⌛</span>
                                                Adding...
                                            </span>
                                        ) : (
                                            <>
                                                <ShoppingCart className="w-5 h-5 mr-2" />
                                                Add to Cart
                                            </>
                                        )}
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
                                                <StarRating rating={review.rating} size="sm" />
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
            </ErrorBoundary>
        </div>
    );
};

export default ProductDetail;