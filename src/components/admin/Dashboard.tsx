"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ManageProducts from "@/app/admin/manage-products/page";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Users, ShoppingCart, Settings, LogOut, Menu, TrendingUp, Activity } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { withAdminAuth } from "./AdminAuth";

const AdminDashboardComponent = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                const [productsSnapshot, usersSnapshot, ordersSnapshot] = await Promise.all([
                    getDocs(collection(db, "products")),
                    getDocs(collection(db, "users")),
                    getDocs(collection(db, "orders")),
                ]);

                const totalRevenue = ordersSnapshot.docs.reduce((sum, doc) =>
                    sum + (doc.data().total || 0), 0
                );

                setStats({
                    totalProducts: productsSnapshot.size,
                    totalUsers: usersSnapshot.size,
                    totalOrders: ordersSnapshot.size,
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
        { name: "Overview", tab: "overview", icon: Activity },
        { name: "Products", tab: "products", icon: Package },
        { name: "Users", tab: "users", icon: Users },
        { name: "Orders", tab: "orders", icon: ShoppingCart },
        { name: "Analytics", tab: "analytics", icon: TrendingUp },
        { name: "Settings", tab: "settings", icon: Settings },
    ];

    interface StatCardProps {
        title: string;
        value: number | string;
        icon: React.ComponentType<{ className?: string }>;
        trend?: number;
    }

    const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{title}</p>
                            <h3 className="text-2xl font-bold mt-1">{value}</h3>
                        </div>
                    </div>
                    {trend && (
                        <div className={`text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {trend > 0 ? '+' : ''}{trend}%
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    const Overview = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Products"
                    value={stats.totalProducts}
                    icon={Package}
                    trend={12}
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers}
                    icon={Users}
                    trend={8}
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingCart}
                    trend={-3}
                />
                <StatCard
                    title="Revenue"
                    value={`$${stats.revenue.toLocaleString()}`}
                    icon={TrendingUp}
                    trend={15}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
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
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { id: "ORD001", customer: "John Doe", status: "Completed", amount: "$250.00" },
                                    { id: "ORD002", customer: "Jane Smith", status: "Processing", amount: "$180.50" },
                                    { id: "ORD003", customer: "Mike Johnson", status: "Pending", amount: "$320.75" },
                                ].map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.customer}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">{order.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[300px] pr-4">
                            {[
                                { time: "2 minutes ago", action: "New order received", user: "Sarah Wilson" },
                                { time: "1 hour ago", action: "Product stock updated", user: "Admin System" },
                                { time: "3 hours ago", action: "New user registered", user: "James Brown" },
                                { time: "5 hours ago", action: "Refund processed", user: "Support Team" },
                                { time: "1 day ago", action: "New product added", user: "Admin System" },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center py-3">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-4" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            by {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    const ProductsTab = () => {
        return (
            <div className="w-full">
                <ManageProducts />
            </div>
        );
    };


    return (
        <div className="flex min-h-screen bg-background">
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <SheetHeader className="p-4 bg-primary text-primary-foreground">
                            <SheetTitle>Fashion Shop Admin</SheetTitle>
                        </SheetHeader>
                        <ScrollArea className="h-[calc(100vh-64px)]">
                            <div className="p-4 space-y-2">
                                {navigation.map((item) => (
                                    <Button
                                        key={item.tab}
                                        variant={activeTab === item.tab ? "secondary" : "ghost"}
                                        className="w-full justify-start"
                                        onClick={() => {
                                            setActiveTab(item.tab);
                                            setIsMobileMenuOpen(false);
                                        }}
                                    >
                                        <item.icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Button>
                                ))}
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </Button>
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r">
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary text-primary-foreground">
                        <h1 className="text-xl font-bold">Fashion Shop Admin</h1>
                    </div>
                    <ScrollArea className="flex-1">
                        <nav className="flex-1 px-4 py-4 space-y-2">
                            {navigation.map((item) => (
                                <Button
                                    key={item.tab}
                                    variant={activeTab === item.tab ? "secondary" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab(item.tab)}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Button>
                            ))}
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                                onClick={handleLogout}
                            >
                                <LogOut className="mr-3 h-5 w-5" />
                                Logout
                            </Button>
                        </nav>
                    </ScrollArea>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64 flex flex-col flex-1">
                <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
                    {activeTab === "overview" && <Overview />}
                    {activeTab === "products" && <ProductsTab />}
                    {/* Add other tab content components here */}
                </main>
            </div>
        </div>
    );
};

export const AdminDashboard = withAdminAuth(AdminDashboardComponent);

export default AdminDashboard;

// Removed duplicate function implementation
