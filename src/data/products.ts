import { Product, Color } from '@/types';

export const colors: Color[] = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Red', hex: '#FF0000' },
  ];
export const products: Product[] = [
  {
    id: '5sfo9xejCg8dARvqZPlY',
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
  {
    id: 'rdtRcCHuyhOIykThYUj4',
    name: 'Slim Fit Jeans',
    description: 'Classic slim fit jeans made from premium denim.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1551024559-d69bcf67d8d1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1568613065038-396d25f1c222?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1495298599282-d8920eb5009b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'bottoms',
    sizes: ['28', '30', '32', '34', '36'],
    colors: colors, // Black, Navy, Gray
    inStock: true,
    features: [
      '98% cotton, 2% elastane',
      'Slim fit',
      'Zip fly with button closure',
      'Machine washable'
    ],
    rating: 4.2,
    reviews: [
      {
        id: 'r2',
        userId: 'u2',
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Good fit, but the color faded a bit after washing.',
        date: '2024-02-15'
      }
    ]
  },
  {
    id: 'sAPIC7x3Cf3Y5hQngSl8',
    name: 'Elegant Evening Dress',
    description: 'Stunning evening dress perfect for special occasions.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1551621955-fa07d4b1376b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: colors, // Black, Red, Green, Purple
    inStock: true,
    features: [
      'Satin fabric',
      'Floor-length',
      'Concealed zipper closure',
      'Dry clean only'
    ],
    rating: 4.7,
    reviews: [
      {
        id: 'r3',
        userId: 'u3',
        userName: 'Alice Johnson',
        rating: 5,
        comment: 'Absolutely stunning dress! Perfect for my event.',
        date: '2024-03-01'
      }
    ]
  },
  {
    id: '4',
    name: 'Winter Parka Jacket',
    description: 'Warm and stylish parka jacket for cold weather.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1561778233-89714b6f2033?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1461935793258-ac2ac2c930b2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1610171668003-2e86bd1cc902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'outerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: colors, // Black, Navy, Gray
    inStock: true,
    features: [
      'Water-resistant fabric',
      'Faux fur hood',
      'Multiple pockets',
      'Machine washable'
    ],
    rating: 4.6,
    reviews: [
      {
        id: 'r4',
        userId: 'u4',
        userName: 'Bob Williams',
        rating: 4,
        comment: 'Keeps me warm and dry in the winter. Great jacket!',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '5',
    name: 'Leather Belt',
    description: 'Genuine leather belt with a classic buckle.',
    price: 39.99,
    images: [
      'https://images.unsplash.com/photo-1623393807193-e095f7944161?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1610456684094-f0d7d8f2e714?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1502898746234-cdef14a6eec4?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    category: 'accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: colors, // Black, Brown (added brown directly)
    inStock: true,
    features: [
      '100% genuine leather',
      'Classic buckle design',
      'Adjustable length',
    ],
    rating: 4.3,
    reviews: [
      {
        id: 'r5',
        userId: 'u5',
        userName: 'Charlie Brown',
        rating: 5,
        comment: 'High-quality belt that looks great with everything.',
        date: '2023-12-20'
      }
    ]
  },
  {
    id: '6',
    name: 'Striped Long Sleeve Shirt',
    description: 'Comfortable long sleeve shirt with a stylish striped pattern.',
    price: 34.99,
    images: [
        "https://images.unsplash.com/photo-1509305717900-84f40e786d82?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: colors, // White, Navy, Blue
    inStock: false,
    features: [
        '100% cotton',
        'Classic Fit',
        'Machine Washable',
    ],
    rating: 3.9,
    reviews: [
        {
            id: 'r6',
            userId: 'u6',
            userName: 'David Lee',
            rating: 4,
            comment: 'Nice shirt, runs a little small.',
            date: '2023-11-15',
        },
    ],
  },
  {
        id: 'oHAWR1tFMI61ZKeeDpHi',
        name: 'Classic Aviator Sunglasses',
        description: 'Timeless aviator sunglasses with a lightweight metal frame and polarized lenses.',
        price: 79.99,
        images: [
            'https://images.unsplash.com/photo-1625480862838-aa155da6ac2c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
            'https://images.unsplash.com/photo-1603437229473-42c27161c85d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
            'https://images.unsplash.com/photo-1581145448447-225410c911e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Replace with your actual image URL
        ],
        category: 'accessories',
        sizes: ['One Size'], // Sunglasses typically have a single size
        colors: colors, // Black, Silver, Gold frames
        inStock: true,
        features: [
            'Polarized lenses',
            '100% UV protection',
            'Lightweight metal frame',
            'Adjustable nose pads',
        ],
        rating: 4.8,
        reviews: [
            {
                id: 'r7',
                userId: 'u7',
                userName: 'Emily Davis',
                rating: 5,
                comment: 'Love these sunglasses! They are stylish and provide great protection from the sun.',
                date: '2024-03-05',
            },
            {
                id: 'r8',
                userId: 'u8',
                userName: 'David Brown',
                rating: 4,
                comment: 'Good quality sunglasses, but the frame feels a little delicate.',
                date: '2024-02-20',
            },
        ],
    },
    {
        id: '8',
        name: 'Retro Square Sunglasses',
        description: 'Stylish square sunglasses with a bold acetate frame for a vintage look.',
        price: 69.99,
        images: [
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
            'https://images.unsplash.com/photo-1581778571772-11f8c6af4103?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
            'https://images.unsplash.com/photo-1600024914363-d9bf85e438f0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Replace with your actual image URL
        ],
        category: 'accessories',
        sizes: ['One Size'],
        colors: colors, // Black, Tortoise
        inStock: true,
        features: [
            'Durable acetate frame',
            '100% UV protection',
            'Scratch-resistant lenses',
            'Comfortable fit',
        ],
        rating: 4.5,
        reviews: [
            {
                id: 'r9',
                userId: 'u9',
                userName: 'Michael Lee',
                rating: 5,
                comment: 'Great sunglasses for the price!  Love the retro style.',
                date: '2024-01-15',
            },
        ],
    },
    {
      id: '10',
      name: 'Sport Sunglasses',
      description: 'Designed for athletes, these sunglasses feature a wraparound design and impact-resistant lenses.',
      price: 89.99,
      images: [
          'https://images.unsplash.com/photo-1620226017713-b7de2cdd476c?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
          'https://images.unsplash.com/photo-1600366249664-acd65e33e5d2?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your actual image URL
          'https://images.unsplash.com/photo-1675798828659-5558961c38db?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'  // Replace with your actual image URL
      ],
      category: 'accessories',
      sizes: ['One Size'],
      colors: colors, // Black, Blue, Green
      inStock: false,
      features: [
          'Impact-resistant lenses',
          'Wraparound design',
          'Non-slip nose pads and temple tips',
          '100% UV protection',
      ],
      rating: 4.6,
      reviews: [
          {
              id: 'r10',
              userId: 'u10',
              userName: 'Sarah Johnson',
              rating: 5,
              comment: 'Perfect for running and cycling. They stay in place and the lenses are great.',
              date: '2023-12-01',
          },
      ],
  }
  
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'dresses', name: 'Dresses' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories'}
];
