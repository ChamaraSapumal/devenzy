// ProductPage.tsx
"use client";

import React from "react";
import ProductDetailAdminContent from "./ProductDetailAdminContent";

type ProductPageProps = {
    id: string;
    initialProductName: string;
};

export default function ProductPage({ id, initialProductName }: ProductPageProps) {
    return (
        <>
            <title>{`Edit ${initialProductName} - Admin Dashboard`}</title>
            <ProductDetailAdminContent productId={id} />
        </>
    );
}