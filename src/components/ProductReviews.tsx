// ProductReviews.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface Review {
    id: string;
    userName: string;
    rating: number;
    date: string;
    comment: string;
}

interface ProductReviewsProps {
    reviews: Review[];
}

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
        ))}
    </div>
);

const ProductReviews = ({ reviews }: ProductReviewsProps) => (
    <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="font-semibold">{review.userName}</p>
                                <StarRating rating={review.rating} size="sm" />
                            </div>
                            <time className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                            </time>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </section>
);

export default ProductReviews;