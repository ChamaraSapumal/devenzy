"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HomeIcon } from 'lucide-react';

interface UserData {
    role?: string;
}

const checkAdminRole = async (uid: string): Promise<boolean> => {
    if (!uid) {
        console.log("No UID provided");
        return false;
    }

    try {
        console.log("Fetching user data for UID:", uid);
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            console.log("No user document found in Firestore for UID:", uid);
            return false;
        }

        const userData = userDoc.data() as UserData;
        console.log("Fetched User Data:", userData);
        return userData?.role === "admin";  // Ensure you're correctly accessing the role
    } catch (error) {
        console.error("Error fetching user role:", error);
        return false;
    }
};



export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    interface HandleLoginEvent extends React.FormEvent<HTMLFormElement> { }

    interface UserCredential {
        user: {
            uid: string;
        };
    }

    const handleLogin = async (e: HandleLoginEvent): Promise<void> => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
            const isAdmin: boolean = await checkAdminRole(userCredential.user.uid);

            if (isAdmin) {
                router.replace("/admin/dashboard");
            } else {
                setError("Access denied. Admin privileges required.");
                await signOut(auth);
            }
        } catch (error) {
            setError("Invalid credentials or access denied.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center font-bold">
                        Admin Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                        <Button
                            type="button"
                            className="w-full"
                            disabled={isLoading}
                            onClick={() => router.push('/')}
                        >
                            <HomeIcon className="w-4 h-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
