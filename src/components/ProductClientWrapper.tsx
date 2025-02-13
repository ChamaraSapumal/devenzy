// components/ProductClientWrapper.tsx
'use client';

import { Product } from "@/types";
import ProductWrapper from "./ProductWrapper";

interface ProductClientWrapperProps {
    productData: Product;
}

export default function ProductClientWrapper({ productData }: ProductClientWrapperProps) {
    // Handle any client-side state or event handlers here
    return <ProductWrapper initialProduct={productData} />;
}