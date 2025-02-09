"use client";

import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { Loading } from "@/components/ui/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Type for user roles
type UserRole = "admin" | "user";

// Interface for user document
interface UserDoc {
    role: UserRole;
    // Add other user fields as needed
}

// Cache for admin status to prevent unnecessary DB calls
const adminStatusCache = new Map<string, boolean>();

const checkAdminRole = async (uid: string): Promise<boolean> => {
    // Return cached status if available
    if (adminStatusCache.has(uid)) {
        return adminStatusCache.get(uid)!;
    }

    if (!uid) return false;

    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        const isAdmin = userDoc.exists() && (userDoc.data() as UserDoc)?.role === "admin";

        // Cache the result
        adminStatusCache.set(uid, isAdmin);
        return isAdmin;
    } catch (error) {
        console.error("Error checking admin role:", error);
        return false;
    }
};

// Props interface for the HOC
interface WithAdminAuthProps {
    fallbackUrl?: string;
    loadingComponent?: React.ReactNode;
}

export const withAdminAuth = (
    WrappedComponent: React.ComponentType,
    { fallbackUrl = '/admin/login', loadingComponent }: WithAdminAuthProps = {}
) => {
    return function WithAdminAuthWrapper(props: any) {
        const [isAdmin, setIsAdmin] = useState(false);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);
        const [user, setUser] = useState<User | null>(null);
        const router = useRouter();

        useEffect(() => {
            let isMounted = true;

            const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                try {
                    if (!currentUser) {
                        if (isMounted) {
                            setUser(null);
                            router.replace(fallbackUrl);
                        }
                        return;
                    }

                    setUser(currentUser);
                    const adminStatus = await checkAdminRole(currentUser.uid);

                    if (isMounted) {
                        if (adminStatus) {
                            setIsAdmin(true);
                        } else {
                            setError("Access denied. Insufficient permissions.");
                            router.replace(fallbackUrl);
                        }
                    }
                } catch (error) {
                    if (isMounted) {
                        setError("Error verifying admin access. Please try again.");
                        console.error("Admin verification error:", error);
                    }
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            });

            return () => {
                isMounted = false;
                unsubscribe();
            };
        }, [router, fallbackUrl]);

        if (loading) {
            return loadingComponent || <Loading />;
        }

        if (error) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <Alert variant="destructive">
                        <AlertTitle>Authentication Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </div>
            );
        }

        // Only render the wrapped component if user is authenticated and is admin
        return isAdmin && user ? <WrappedComponent {...props} user={user} /> : null;
    };
};