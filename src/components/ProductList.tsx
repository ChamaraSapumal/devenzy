"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    inStock: boolean;
    images: string[];
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        category: data.category,
                        price: data.price,
                        inStock: data.inStock,
                        images: data.images
                    };
                });
                setProducts(productList);
                setSortedProducts(productList); // Initially setting sorted products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Apply search filter
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedProducts(filteredProducts);
    }, [searchTerm, products]);

    const handleSortByPrice = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    };

    const handleSortByName = () => {
        const sorted = [...sortedProducts].sort((a, b) => a.name.localeCompare(b.name));
        setSortedProducts(sorted);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product List</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton height={40} width="100%" />
                        <Skeleton height={40} width="100%" />
                        <Skeleton height={40} width="100%" />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-72"
                            />
                            <div>
                                <Button variant="ghost" onClick={handleSortByName}>Sort by Name</Button>
                                <Button variant="ghost" onClick={handleSortByPrice}>Sort by Price</Button>
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Image</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedProducts.length > 0 ? (
                                    sortedProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>{product.inStock ? "In Stock" : "Out of Stock"}</TableCell>
                                            <TableCell>
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center">
                                            No products found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductList;
