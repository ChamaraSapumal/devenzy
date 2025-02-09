"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Package, Users, ShoppingCart, Settings, LogOut } from "lucide-react";
import NewProductForm from "@/components/NewProductForm"; // Adjust the import path as necessary
import ProductList from "@/components/ProductList"; // Adjust the import path as necessary
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const AdminDashboardComponent = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOrders: 0,
        revenue: 0,
    });
    const router = useRouter();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch products count
                const productsSnapshot = await getDocs(collection(db, "products"));
                const productsCount = productsSnapshot.size;

                // Fetch users count
                const usersSnapshot = await getDocs(collection(db, "users"));
                const usersCount = usersSnapshot.size;

                // Fetch orders count and calculate revenue
                const ordersSnapshot = await getDocs(collection(db, "orders"));
                const ordersCount = ordersSnapshot.size;
                let totalRevenue = 0;
                ordersSnapshot.forEach((doc) => {
                    const orderData = doc.data();
                    totalRevenue += orderData.total || 0;
                });

                setStats({
                    totalProducts: productsCount,
                    totalUsers: usersCount,
                    totalOrders: ordersCount,
                    revenue: totalRevenue,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        fetchStats();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.replace("/admin/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const navigation = [
        { name: "Overview", tab: "overview", icon: Package },
        { name: "Products", tab: "products", icon: ShoppingCart },
        { name: "Users", tab: "users", icon: Users },
        { name: "Settings", tab: "settings", icon: Settings },
    ];

    interface StatCardProps {
        title: string;
        value: number | string;
        icon: React.ComponentType<{ className?: string }>;
    }

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
        <Card className="flex-1">
            <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mr-4">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );

    const Overview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Products" value={stats.totalProducts} icon={Package} />
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
                <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingCart} />
                <StatCard title="Revenue" value={`$${stats.revenue.toFixed(2)}`} icon={Package} />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>{/* Add order data here */}</TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );

    const [showNewProductForm, setShowNewProductForm] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-gray-900">
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-white">Fashion Shop Admin</h1>
                    </div>
                    <nav className="flex-1 px-2 py-4 space-y-1">
                        {navigation.map((item) => (
                            <Button
                                key={item.tab}
                                variant={activeTab === item.tab ? "secondary" : "ghost"}
                                className={`w-full justify-start rounded-lg transition-all duration-200 ${activeTab === item.tab
                                    ? "bg-gray-700 text-white hover:bg-gray-600"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                                onClick={() => setActiveTab(item.tab)}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Button>
                        ))}
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </Button>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    {activeTab === "overview" && <Overview />}
                    {activeTab === "products" && (
                        <div className="space-y-6">
                            {showNewProductForm ? (
                                <div className="mb-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowNewProductForm(false)}
                                        className="mb-4"
                                    >
                                        ← Back to Products
                                    </Button>
                                    <NewProductForm
                                        onSuccess={() => {
                                            setShowNewProductForm(false);
                                            // Optionally refresh your products list here
                                        }}
                                    />
                                </div>
                            ) : (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Products Management</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <Input className="max-w-sm" placeholder="Search products..." />
                                                <Button onClick={() => setShowNewProductForm(true)}>
                                                    Add New Product
                                                </Button>
                                            </div>

                                            <ProductList />
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Corrected withAdminAuth function
interface WithAdminAuthProps {
    [key: string]: any;
}

interface UserData {
    role: string;
}

const withAdminAuth = (WrappedComponent: React.ComponentType<any>) => {
    return (props: WithAdminAuthProps) => {
        const [isAdmin, setIsAdmin] = useState<boolean>(false);
        const [loading, setLoading] = useState<boolean>(true);
        const router = useRouter();

        useEffect(() => {
            const checkAdmin = async () => {
                const user = auth.currentUser;
                if (!user) {
                    router.replace("/admin/login");
                    return;
                }

                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data() as UserData;
                    if (userData.role === "admin") {
                        setIsAdmin(true);
                    } else {
                        router.replace("/admin/login");
                    }
                } else {
                    router.replace("/admin/login");
                }
                setLoading(false);
            };

            checkAdmin();
        }, [router]);

        if (loading) return <div>Loading...</div>;
        if (!isAdmin) return null;

        return <WrappedComponent {...props} />;
    };
};

export const AdminDashboard = withAdminAuth(AdminDashboardComponent);
export default AdminDashboard;
