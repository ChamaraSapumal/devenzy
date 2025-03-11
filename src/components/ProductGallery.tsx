// ProductGallery.tsx
'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => (
    <div className="relative">
        <Carousel className="w-full">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Card className="border-none shadow-none">
                            <CardContent className="p-0">
                                <img
                                    src={image}
                                    alt={`${productName} - View ${index + 1}`}
                                    className="w-full h-[500px] object-cover rounded-2xl"
                                />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
        </Carousel>
    </div>
);

export default ProductGallery;