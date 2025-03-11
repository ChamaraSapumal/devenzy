// ProductActions.tsx
'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Product, Color } from '@/types';

interface ProductActionsProps {
    product: Product;
    sizes: string[];
    colors: Color[];
}

const ProductActions = ({ product, sizes, colors }: ProductActionsProps) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
    const [selectedColor, setSelectedColor] = useState<Color | null>(colors[0] || null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

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
        <div className="space-y-4">
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size, index) => (
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
                    {colors.map((color, index) => (
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
                        onClick={() => handleQuantityChange('decrease')}
                        disabled={quantity <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange('increase')}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
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
    );
};

export default ProductActions;