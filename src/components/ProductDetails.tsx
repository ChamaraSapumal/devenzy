import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Product, Color } from '@/types';

interface ProductDetailsProps {
    product: Product;
    onAddToCart: (product: Product, size: string, color: Color) => void;
    onAddToWishlist: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    product,
    onAddToCart,
    onAddToWishlist,
}) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6">
                {/* Image gallery */}
                <div className="space-y-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === index ? 'border-black' : 'border-transparent'
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} view ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                <span className="ml-1">{product.rating}</span>
                            </div>
                            <span className="text-gray-500">
                                ({product.reviews.length} reviews)
                            </span>
                        </div>
                        <p className="text-2xl font-bold mt-4">${product.price}</p>
                    </div>

                    {/* Color selection */}
                    <div>
                        <h3 className="font-semibold mb-2">Color</h3>
                        <div className="flex gap-2">
                            {product.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border-2 ${selectedColor.name === color.name
                                            ? 'border-black'
                                            : 'border-gray-300'
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div>
                        <h3 className="font-semibold mb-2">Size</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-2 rounded border ${selectedSize === size
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 hover:border-black'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600">{product.description}</p>

                    {/* Features */}
                    <div>
                        <h3 className="font-semibold mb-2">Features</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {product.features.map((feature, index) => (
                                <li key={index} className="text-gray-600">
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                        <button
                            onClick={() => onAddToWishlist(product)}
                            className="w-full border border-black py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <Heart className="w-5 h-5" />
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;