// components/ProductWrapper.tsx
'use client';

import { Product } from "@/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ProductDetail = dynamic(() => import("./ProductDetails"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse text-lg">Loading product details...</div>
    </div>
  )
});

export default function ProductWrapper({ initialProduct }: { initialProduct: Product }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ProductDetail product={initialProduct} />;
}