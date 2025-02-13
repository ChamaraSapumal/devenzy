import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp, collection, getDocs } from "firebase/firestore";
import { Product, Review } from "@/types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductClientWrapper from "@/components/ProductClientWrapper";

interface FirestoreReview extends Omit<Review, 'date'> {
    date: Timestamp;
}

interface FirestoreProduct extends Omit<Product, 'reviews' | 'id'> {
    reviews: FirestoreReview[];
}

type PageParams = {
    productId: string;
};

export interface PageProps {
    params: Promise<PageParams>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// Helper function to get product data
const getProductData = async (productId: string): Promise<Product | null> => {
    try {
        const productRef = doc(db, "products", productId);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            return null;
        }

        const data = productDoc.data() as FirestoreProduct;

        if (!data.name || !data.description || typeof data.price !== 'number') {
            console.error("Invalid product data structure");
            return null;
        }

        // Create a plain object with only the data we need
        const processedProduct = {
            id: productDoc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            images: data.images || [],
            category: data.category || '',
            sizes: data.sizes || [],
            colors: data.colors || [],
            inStock: data.inStock || false,
            features: data.features || [],
            rating: data.rating || 0,
            reviews: (data.reviews || []).map(review => ({
                id: review.id,
                userId: review.userId,
                userName: review.userName,
                rating: review.rating,
                comment: review.comment,
                date: review.date instanceof Timestamp
                    ? review.date.toDate().toISOString()
                    : new Date(review.date).toISOString()
            }))
        };

        return processedProduct;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};

export const dynamicParams = false;

export async function generateStaticParams() {
    try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        return productsSnapshot.docs.map((doc) => ({
            productId: doc.id,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata(
    { params }: { params: Promise<PageParams> }
): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const product = await getProductData(resolvedParams.productId);

        if (!product) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found',
            };
        }

        return {
            title: `${product.name} - Fashion Shop`,
            description: product.description,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: 'Product - Fashion Shop',
            description: 'Product details',
        };
    }
}

// Page component
export default async function Page({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const { productId } = resolvedParams;

    if (!productId) {
        notFound();
    }

    const product = await getProductData(productId);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ProductClientWrapper productData={product} />
        </div>
    );
}