module.exports = {

"[project]/src/data/products.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "categories": (()=>categories),
    "colors": (()=>colors),
    "products": (()=>products)
});
const colors = [
    {
        name: 'Black',
        hex: '#000000'
    },
    {
        name: 'White',
        hex: '#FFFFFF'
    },
    {
        name: 'Navy',
        hex: '#000080'
    },
    {
        name: 'Red',
        hex: '#FF0000'
    }
];
const products = [
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
        sizes: [
            'XS',
            'S',
            'M',
            'L',
            'XL'
        ],
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
        id: '2',
        name: 'Slim Fit Jeans',
        description: 'Classic slim fit jeans made from premium denim.',
        price: 59.99,
        images: [
            'https://images.unsplash.com/photo-1551024559-d69bcf67d8d1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1568613065038-396d25f1c222?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1495298599282-d8920eb5009b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        category: 'bottoms',
        sizes: [
            '28',
            '30',
            '32',
            '34',
            '36'
        ],
        colors: colors,
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
        id: '3',
        name: 'Elegant Evening Dress',
        description: 'Stunning evening dress perfect for special occasions.',
        price: 129.99,
        images: [
            'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1551621955-fa07d4b1376b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ],
        category: 'dresses',
        sizes: [
            'S',
            'M',
            'L',
            'XL'
        ],
        colors: colors,
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
        sizes: [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ],
        colors: colors,
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
        sizes: [
            'S',
            'M',
            'L',
            'XL'
        ],
        colors: colors,
        inStock: true,
        features: [
            '100% genuine leather',
            'Classic buckle design',
            'Adjustable length'
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
        sizes: [
            'XS',
            'S',
            'M',
            'L',
            'XL'
        ],
        colors: colors,
        inStock: false,
        features: [
            '100% cotton',
            'Classic Fit',
            'Machine Washable'
        ],
        rating: 3.9,
        reviews: [
            {
                id: 'r6',
                userId: 'u6',
                userName: 'David Lee',
                rating: 4,
                comment: 'Nice shirt, runs a little small.',
                date: '2023-11-15'
            }
        ]
    },
    {
        id: '7',
        name: 'Classic Aviator Sunglasses',
        description: 'Timeless aviator sunglasses with a lightweight metal frame and polarized lenses.',
        price: 79.99,
        images: [
            'https://images.unsplash.com/photo-1507518858358-37352945c171?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1603437229473-42c27161c85d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1581145448447-225410c911e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with your actual image URL
        ],
        category: 'accessories',
        sizes: [
            'One Size'
        ],
        colors: colors,
        inStock: true,
        features: [
            'Polarized lenses',
            '100% UV protection',
            'Lightweight metal frame',
            'Adjustable nose pads'
        ],
        rating: 4.8,
        reviews: [
            {
                id: 'r7',
                userId: 'u7',
                userName: 'Emily Davis',
                rating: 5,
                comment: 'Love these sunglasses! They are stylish and provide great protection from the sun.',
                date: '2024-03-05'
            },
            {
                id: 'r8',
                userId: 'u8',
                userName: 'David Brown',
                rating: 4,
                comment: 'Good quality sunglasses, but the frame feels a little delicate.',
                date: '2024-02-20'
            }
        ]
    },
    {
        id: '8',
        name: 'Retro Square Sunglasses',
        description: 'Stylish square sunglasses with a bold acetate frame for a vintage look.',
        price: 69.99,
        images: [
            'https://images.unsplash.com/photo-1556227846-87091552a844?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1581145449624-7c2b65430f5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1575535881572-3ef043c258f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with your actual image URL
        ],
        category: 'accessories',
        sizes: [
            'One Size'
        ],
        colors: colors,
        inStock: true,
        features: [
            'Durable acetate frame',
            '100% UV protection',
            'Scratch-resistant lenses',
            'Comfortable fit'
        ],
        rating: 4.5,
        reviews: [
            {
                id: 'r9',
                userId: 'u9',
                userName: 'Michael Lee',
                rating: 5,
                comment: 'Great sunglasses for the price!  Love the retro style.',
                date: '2024-01-15'
            }
        ]
    },
    {
        id: '10',
        name: 'Sport Sunglasses',
        description: 'Designed for athletes, these sunglasses feature a wraparound design and impact-resistant lenses.',
        price: 89.99,
        images: [
            'https://images.unsplash.com/photo-1620226017713-b7de2cdd476c?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1600366249664-acd65e33e5d2?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1675798828659-5558961c38db?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Replace with your actual image URL
        ],
        category: 'accessories',
        sizes: [
            'One Size'
        ],
        colors: colors,
        inStock: false,
        features: [
            'Impact-resistant lenses',
            'Wraparound design',
            'Non-slip nose pads and temple tips',
            '100% UV protection'
        ],
        rating: 4.6,
        reviews: [
            {
                id: 'r10',
                userId: 'u10',
                userName: 'Sarah Johnson',
                rating: 5,
                comment: 'Perfect for running and cycling. They stay in place and the lenses are great.',
                date: '2023-12-01'
            }
        ]
    }
];
const categories = [
    {
        id: 'all',
        name: 'All Products'
    },
    {
        id: 'tops',
        name: 'Tops'
    },
    {
        id: 'bottoms',
        name: 'Bottoms'
    },
    {
        id: 'dresses',
        name: 'Dresses'
    },
    {
        id: 'outerwear',
        name: 'Outerwear'
    },
    {
        id: 'accessories',
        name: 'Accessories'
    }
];
}}),
"[project]/src/app/product/[id]/ProductDetailsWrapper.tsx (client proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/product/[id]/ProductDetailsWrapper.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/product/[id]/ProductDetailsWrapper.tsx <module evaluation>", "default");
}}),
"[project]/src/app/product/[id]/ProductDetailsWrapper.tsx (client proxy)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/product/[id]/ProductDetailsWrapper.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/product/[id]/ProductDetailsWrapper.tsx", "default");
}}),
"[project]/src/app/product/[id]/ProductDetailsWrapper.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailsWrapper$2e$tsx__$28$client__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/src/app/product/[id]/ProductDetailsWrapper.tsx (client proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailsWrapper$2e$tsx__$28$client__proxy$29$__ = __turbopack_import__("[project]/src/app/product/[id]/ProductDetailsWrapper.tsx (client proxy)");
;
__turbopack_export_namespace__(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailsWrapper$2e$tsx__$28$client__proxy$29$__);
}}),
"[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ProductPage),
    "generateStaticParams": (()=>generateStaticParams)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/data/products.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailsWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/product/[id]/ProductDetailsWrapper.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].map((product)=>({
            id: product.id
        }));
}
async function ProductPage({ params }) {
    const { id } = await params; // Unwrap params before accessing id
    const product = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$products$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === id);
    if (!product) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "inline-flex items-center gap-2 mb-6 text-gray-600 hover:text-black",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/app/product/[id]/page.tsx",
                            lineNumber: 31,
                            columnNumber: 21
                        }, this),
                        "Back to Products"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/product/[id]/page.tsx",
                    lineNumber: 27,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-sm text-gray-500 mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "hover:text-black",
                            children: "Home"
                        }, void 0, false, {
                            fileName: "[project]/src/app/product/[id]/page.tsx",
                            lineNumber: 37,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-2",
                            children: "/"
                        }, void 0, false, {
                            fileName: "[project]/src/app/product/[id]/page.tsx",
                            lineNumber: 38,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-black",
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/product/[id]/page.tsx",
                            lineNumber: 39,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/product/[id]/page.tsx",
                    lineNumber: 36,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$product$2f5b$id$5d2f$ProductDetailsWrapper$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                    product: product
                }, void 0, false, {
                    fileName: "[project]/src/app/product/[id]/page.tsx",
                    lineNumber: 43,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/product/[id]/page.tsx",
            lineNumber: 25,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/product/[id]/page.tsx",
        lineNumber: 24,
        columnNumber: 9
    }, this);
}
}}),
"[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_namespace__(__turbopack_import__("[project]/src/app/product/[id]/page.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/.next-internal/server/app/product/[id]/page/actions.js [app-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=_1e1a3d._.js.map