import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function createMetadata({ params }: { params: { id: string } }) {
    const productDoc = await getDoc(doc(db, "products", params.id));
    const product = productDoc.data();

    return {
        title: `Edit ${product?.name || 'Product'} - Admin Dashboard`,
        description: `Edit details for ${product?.name}`,
    };
}
