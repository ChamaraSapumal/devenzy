"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2, ArrowLeft } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Skeleton from "react-loading-skeleton";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    images: string[];
};

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const productList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            } as Product));
            setProducts(productList);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (productId: string) => {
        router.push(`/admin/manage-products/${productId}`);
    };

    const handleDelete = async (productId: string) => {
        setProductToDelete(productId);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                await deleteDoc(doc(db, "products", productToDelete));
                setProducts(products.filter(p => p.id !== productToDelete));
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const handleToggleStock = async (productId: string, currentStock: boolean) => {
        try {
            await updateDoc(doc(db, "products", productId), {
                inStock: !currentStock
            });
            setProducts(products.map(p =>
                p.id === productId ? { ...p, inStock: !currentStock } : p
            ));
        } catch (error) {
            console.error("Error updating stock status:", error);
        }
    };

    return (
        <div className="p-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/admin/dashboard")}
                            className="flex items-center"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                        <CardTitle>Manage Products</CardTitle>
                    </div>
                    <Button onClick={() => router.push("/admin/manage-products/new")}>
                        Add New Product
                    </Button>

                </CardHeader>
                <CardContent>
                    <div className="relative mb-6">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton height={50} count={5} />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Stock Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            {product.images?.[0] && (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            ${product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant={product.inStock ? "default" : "destructive"}
                                                size="sm"
                                                onClick={() => handleToggleStock(product.id, product.inStock)}
                                            >
                                                {product.inStock ? "In Stock" : "Out of Stock"}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(product.id)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            product from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageProducts;