"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithPopup,
    GoogleAuthProvider,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    // In your AuthContext or where you handle sign in
    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Check if user document exists in Firestore
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            // If user document doesn't exist, create it
            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    userId: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    role: 'user' // default role
                });
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}