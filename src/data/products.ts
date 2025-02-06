import { Product, Color } from '@/types';

export const colors: Color[] = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Navy', hex: '#000080' },
  { name: 'Red', hex: '#FF0000' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    description: 'Premium cotton t-shirt with a comfortable fit and durability.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1585487000143-9bcec9b8e483?q=80&w=1891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1617383619176-593fe8bfcde4?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: colors,
    inStock: true,
    features: [
      '100% organic cotton',
      'Breathable fabric',
      'Regular fit',
      'Machine washable'
    ],
    rating: 4.5,
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'John Doe',
        rating: 5,
        comment: 'Great quality and comfortable fit!',
        date: '2024-02-01'
      }
    ]
  },
  // Add more products here...
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' }
];