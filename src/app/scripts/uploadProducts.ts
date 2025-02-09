import { db } from "../../lib/firebase";
import { products } from "../../data/products";
import { 
    Firestore, 
    collection as firestoreCollection, 
    addDoc, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    deleteDoc 
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 

interface Color {
    name: string;
    hex: string;
}

interface Review {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

interface Product {
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
}

const uploadProducts = async (): Promise<void> => {
    if (!db) {
        throw new Error("Firebase database connection not initialized");
    }

    const auth = getAuth();

    try {
        console.log("Authenticating admin user...");

        await signInWithEmailAndPassword(auth, "admin@chamarasapumal.github.io", "admin@123");
        console.log("Admin user authenticated");

        const user = auth.currentUser;
        if (!user) {
            console.error("🚨 User is not authenticated");
            return;
        }

        const userDocRef = await getDoc(doc(firestoreCollection(db, "users"), user.uid));
        const userData = userDocRef.data();

        if (userData?.role !== "admin") {
            console.error("🚨 User is not an admin");
            return;
        }

        const productsCollection = collection(db, "products");

        console.log("Fetching existing products from Firestore...");
        const existingDocs = await getDocs(productsCollection);
        const existingProducts: { id: string; name: string }[] = [];

        existingDocs.forEach((doc) => {
            existingProducts.push({ id: doc.id, name: doc.data().name });
        });

        const currentProductNames = new Set(products.map((p) => p.name));

        console.log("Deleting removed products...");
        for (const existingProduct of existingProducts) {
            if (!currentProductNames.has(existingProduct.name)) {
                await deleteDoc(doc(productsCollection, existingProduct.id));
                console.log(`🗑️ Deleted product: ${existingProduct.name}`);
            }
        }

        console.log("Starting product upload...");

        if (!Array.isArray(products)) {
            throw new Error("Products data is not an array");
        }

        console.log(`Found ${products.length} products to upload`);

        for (const product of products) {
            try {
                const { id, ...productWithoutId } = product;

                const existingQuery = query(productsCollection, where("name", "==", product.name));
                const existingDocs = await getDocs(existingQuery);

                if (!existingDocs.empty) {
                    console.log(`⚠️ Skipping duplicate product: ${product.name}`);
                    continue;
                }

                const docRef = await addDoc(productsCollection, productWithoutId);
                console.log(`✅ Uploaded product: ${product.name} with ID: ${docRef.id}`);
            } catch (error) {
                console.error(`❌ Error uploading product ${product.name}:`, error);
            }
        }

        console.log("✨ Product upload completed!");

    } catch (error) {
        console.error("🚨 Authentication failed:", error);
    }
};

function collection(db: Firestore, collectionName: string) {
    return firestoreCollection(db, collectionName);
}

// Execute the upload
console.log("Starting the upload script...");
uploadProducts()
    .then(() => {
        console.log("Script execution completed successfully");
        process.exit(0);
    })
    .catch((error) => {
        console.error("Script execution failed:", error);
        process.exit(1);
    });
