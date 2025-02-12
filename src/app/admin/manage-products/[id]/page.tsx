// page.tsx (Server Component)
import type { Metadata } from 'next';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductPage from './ProductPage';

type PageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const productDoc = await getDoc(doc(db, "products", resolvedParams.id));
    const productName = productDoc.exists() ? productDoc.data()?.name : "Product";

    return {
        title: `Edit ${productName} - Admin Dashboard`,
        description: `Edit product details`,
    };
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const productDoc = await getDoc(doc(db, "products", resolvedParams.id));
    const productName = productDoc.exists() ? productDoc.data()?.name : "Product";

    return <ProductPage id={resolvedParams.id} initialProductName={productName} />;
}