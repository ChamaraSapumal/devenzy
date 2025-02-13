// page.tsx
import type { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import ProductPage from './ProductPage';

// Keep the original PageProps type for compatibility
type PageProps = {
    params: Promise<{ id: string }>;
};

// Add generateStaticParams for static generation
export async function generateStaticParams() {
    try {
        const productsSnapshot = await getDocs(collection(db, "products"));
        return productsSnapshot.docs.map((doc) => ({
            id: doc.id,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const productDoc = await getDoc(doc(db, "products", resolvedParams.id));
        const productName = productDoc.exists() ? productDoc.data()?.name : "Product";

        return {
            title: `Edit ${productName} - Admin Dashboard`,
            description: `Edit product details for ${productName}`,
        };
    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Edit Product - Admin Dashboard",
            description: "Edit product details",
        };
    }
}

export default async function Page({ params }: PageProps) {
    try {
        const resolvedParams = await params;
        const productDoc = await getDoc(doc(db, "products", resolvedParams.id));
        const productData = productDoc.exists() ? productDoc.data() : null;
        const productName = productData?.name || "Product";

        return <ProductPage id={resolvedParams.id} initialProductName={productName} />;
    } catch (error) {
        console.error("Error fetching product:", error);
        return <div>Error loading product</div>;
    }
}