import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import ProductDetail from "@/components/ProductDetails";

type Review = {
    id: number;
    userId: string;
    userName: string;
    comment: string;
    rating: number;
    date: string;
};

type Color = {
    name: string;
    hex: string;
};

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    sizes: string[];
    colors: Color[];
    inStock: boolean;
    features: string[];
    rating: number;
    reviews: Review[];
};

export async function generateStaticParams() {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({
        productId: doc.id,
    }));
}

export default async function ProductPage({
    params,
}: {
    params: { productId: string };
}) {
    const productRef = doc(db, "products", params.productId);
    const productDoc = await getDoc(productRef);

    if (!productDoc.exists()) {
        return <div>Product not found</div>;
    }

    const data = productDoc.data();
    const product: Product = {
        id: productDoc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        category: data.category,
        sizes: data.sizes,
        colors: data.colors,
        inStock: data.inStock,
        features: data.features,
        rating: data.rating,
        reviews: data.reviews,
    };

    return <ProductDetail product={product} />;
}