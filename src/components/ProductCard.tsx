import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onAddToWishlist: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onAddToWishlist,
}) => {
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation(); // Stop event bubbling
        onAddToCart(product);
    };

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToWishlist(product);
    };

    return (
        <Link href={`/product/${product.id}`} className="block">
            <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {/* Image with hover effect */}
                <div className="relative aspect-square overflow-hidden">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 space-y-2">
                        <button
                            onClick={handleAddToWishlist}
                            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                        >
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Product info */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600">${product.price}</p>
                        </div>
                        <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm">{product.rating}</span>
                        </div>
                    </div>

                    {/* Color options */}
                    <div className="flex gap-1 mb-3">
                        {product.colors.map((color) => (
                            <div
                                key={color.name}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>

                    {/* Add to cart button */}
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
