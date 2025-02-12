import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import ProductDetail from "@/components/ProductDetails";
import { Product, Review } from "@/types";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ productId: string }> | undefined;
};

interface FirestoreReview extends Omit<Review, 'date'> {
    date: Timestamp;
}

interface FirestoreProduct extends Omit<Product, 'reviews' | 'id'> {
    reviews: FirestoreReview[];
}

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

        return {
            id: productDoc.id,
            ...data,
            reviews: (data.reviews || []).map(review => ({
                ...review,
                date: review.date instanceof Timestamp ? review.date.toDate().toISOString() : new Date(review.date).toISOString()
            }))
        };
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};

export default async function ProductPage({ params }: Props) {
    if (!params) {
        notFound();
    }

    const resolvedParams = await params;
    const productId = resolvedParams.productId;

    if (!productId) {
        notFound();
    }

    const product = await getProductData(productId);

    if (!product) {
        notFound();
    }

    return <ProductDetail product={product} />;
}