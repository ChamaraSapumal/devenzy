// utils/search.ts
import { Product } from '@/types';

export const searchProducts = (products: Product[], query: string): Product[] => {
    if (!query.trim()) {
        return products;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);

    return products.filter(product => {
        const searchableText = [
            product.name,
            product.description,
            product.category,
            ...product.features,
            ...product.colors.map(color => color.name)
        ].join(' ').toLowerCase();

        // Check if all search terms are found in the searchable text
        return searchTerms.every(term => searchableText.includes(term));
    });
};