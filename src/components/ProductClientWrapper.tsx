// components/ProductClientWrapper.tsx
"use client"; // ✅ Ensure this is a client component

import React from "react";
import ProductDetail from "./ProductDetails";
import { Product } from "@/types";

interface ProductClientWrapperProps {
    productData: Product;
}

const ProductClientWrapper: React.FC<ProductClientWrapperProps> = ({ productData }) => {
    return <ProductDetail product={productData} />;
};

export default ProductClientWrapper;