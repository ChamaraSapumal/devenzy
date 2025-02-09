import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { categories, colors } from "@/data/products";

interface NewProductFormProps {
    onSuccess?: () => void;
}

const NewProductForm: React.FC<NewProductFormProps> = ({ onSuccess }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        sizes: [] as string[],
        features: [] as string[],
        inStock: true,
        imageUrl: "",  // Add this for Unsplash image link
    });
    const [images, setImages] = useState<FileList | null>(null);
    const [currentFeature, setCurrentFeature] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value: string) => {
        setProductData((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    };

    const handleAddFeature = () => {
        if (currentFeature.trim()) {
            setProductData((prev) => ({
                ...prev,
                features: [...prev.features, currentFeature.trim()],
            }));
            setCurrentFeature("");
        }
    };

    const handleRemoveFeature = (index: number) => {
        setProductData((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }));
    };

    const uploadImages = async (files: FileList): Promise<string[]> => {
        const urls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageRef = ref(storage, `products/${Date.now()}_${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            urls.push(url);
        }
        return urls;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (!productData.imageUrl.trim()) {
                throw new Error("Please enter a valid Unsplash image URL");
            }

            const productToSave = {
                ...productData,
                price: parseFloat(productData.price),
                images: [productData.imageUrl],  // Store Unsplash image URL
                colors,
                rating: 0,
                reviews: [],
                createdAt: new Date().toISOString(),
            };

            await addDoc(collection(db, "products"), productToSave);

            setProductData({
                name: "",
                description: "",
                price: "",
                category: "",
                sizes: [],
                features: [],
                inStock: true,
                imageUrl: "",
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create product");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Name</label>
                        <Input
                            name="name"
                            value={productData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Price</label>
                        <Input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select
                            value={productData.category}
                            onValueChange={handleCategoryChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Image URL (Unsplash)</label>
                        <Input
                            type="url"
                            name="imageUrl"
                            value={productData.imageUrl}
                            onChange={handleInputChange}
                            placeholder="Enter Unsplash image URL"
                            required
                        />
                    </div>


                    <div className="space-y-2">
                        <label className="text-sm font-medium">Features</label>
                        <div className="flex gap-2">
                            <Input
                                value={currentFeature}
                                onChange={(e) => setCurrentFeature(e.target.value)}
                                placeholder="Add a feature"
                            />
                            <Button
                                type="button"
                                onClick={handleAddFeature}
                                variant="secondary"
                            >
                                Add
                            </Button>
                        </div>
                        <ul className="mt-2 space-y-1">
                            {productData.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between bg-secondary/20 p-2 rounded"
                                >
                                    {feature}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleRemoveFeature(index)}
                                    >
                                        ✕
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Creating..." : "Create Product"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default NewProductForm;