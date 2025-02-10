"use client";

import { createMetadata as importedCreateMetadata } from "./metadata";


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define the Product type
type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    sizes: string[];
    colors: { name: string; hex: string }[];
    inStock: boolean;
    features: string[];
    rating: number;
    reviews: { id: number; userName: string; rating: number; comment: string; date: string }[];
};

export const dynamic = "force-dynamic";

// Add generateMetadata function for SEO
export async function localCreateMetadata({ params }: { params: { id: string } }) {
    const productDoc = await getDoc(doc(db, "products", params.id));
    const product = productDoc.data();

    return {
        title: `Edit ${product?.name || 'Product'} - Admin Dashboard`,
        description: `Edit details for ${product?.name}`,
    };
}

// Component Implementation
function ProductDetailAdmin({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = React.use(paramsPromise);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});
    const router = useRouter();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productDoc = await getDoc(doc(db, "products", params.id));
                if (productDoc.exists()) {
                    const productData = {
                        id: productDoc.id,
                        ...productDoc.data()
                    } as Product;
                    setProduct(productData);
                    setEditedProduct(productData);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleInputChange = (field: keyof Product, value: any) => {
        setEditedProduct(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            await updateDoc(doc(db, "products", params.id), editedProduct);
            setProduct(editedProduct as Product);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) {
        return (
            <div className="p-4">
                <Skeleton height={50} className="mb-4" />
                <Skeleton height={200} className="mb-4" />
                <Skeleton height={100} count={3} className="mb-4" />
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.back()}
                    className="flex items-center"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Products
                </Button>
                <Button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                    {isEditing ? "Save Changes" : "Edit Product"}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            {isEditing ? (
                                <Input
                                    value={editedProduct.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            ) : (
                                <p>{product.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            {isEditing ? (
                                <Input
                                    value={editedProduct.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                />
                            ) : (
                                <Badge>{product.category}</Badge>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Price</label>
                            {isEditing ? (
                                <Input
                                    type="number"
                                    value={editedProduct.price}
                                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                                />
                            ) : (
                                <p>${product.price}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Stock Status</label>
                            {isEditing ? (
                                <select
                                    className="w-full border rounded-md p-2"
                                    value={editedProduct.inStock ? "true" : "false"}
                                    onChange={(e) => handleInputChange("inStock", e.target.value === "true")}
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            ) : (
                                <Badge variant={product.inStock ? "success" : "destructive"}>
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                </Badge>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        {isEditing ? (
                            <Textarea
                                value={editedProduct.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                rows={4}
                            />
                        ) : (
                            <p>{product.description}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Features</label>
                        {isEditing ? (
                            <Textarea
                                value={editedProduct.features?.join("\n")}
                                onChange={(e) => handleInputChange("features", e.target.value.split("\n"))}
                                placeholder="Enter features (one per line)"
                                rows={4}
                            />
                        ) : (
                            <ul className="list-disc pl-4">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductDetailAdmin;