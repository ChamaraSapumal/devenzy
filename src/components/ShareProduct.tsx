import React, { useState } from 'react';
import { Share, Copy, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";

interface ShareProductProps {
    product: Product;
    url: string;
}


const ShareProduct = ({ product, url }: ShareProductProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const shareText = `Check out ${product.name} - $${product.price}`;

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            action: () => {
                window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
                    '_blank'
                );
                setIsOpen(false);
            }
        },
        {
            name: 'Twitter',
            icon: Twitter,
            action: () => {
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
                    '_blank'
                );
                setIsOpen(false);
            }
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            action: () => {
                window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    '_blank'
                );
                setIsOpen(false);
            }
        },
        {
            name: 'Email',
            icon: Mail,
            action: () => {
                window.location.href = `mailto:?subject=${encodeURIComponent(`Check out this product: ${product.name}`)}&body=${encodeURIComponent(`${shareText}\n\n${url}`)}`;
                setIsOpen(false);
            }
        }
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: "Link copied!",
                description: "Product link has been copied to clipboard",
                duration: 2000,
            });
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Share className="w-5 h-5 text-gray-600" />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Share Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <div className="flex items-center">
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={url}
                                    readOnly
                                />
                            </div>
                        </div>
                        <Button type="submit" size="icon" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {shareLinks.map((link) => (
                            <Button
                                key={link.name}
                                variant="outline"
                                className="flex flex-col items-center gap-2 h-auto py-4"
                                onClick={link.action}
                            >
                                <link.icon className="h-5 w-5" />
                                <span className="text-xs">{link.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareProduct;