(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{8578:(e,s,t)=>{Promise.resolve().then(t.bind(t,5037)),Promise.resolve().then(t.bind(t,3441))},3441:(e,s,t)=>{"use strict";t.d(s,{default:()=>y});var a=t(5155),i=t(2115),r=t(1536),o=t(6046),l=t(689),c=t(7936),n=t(2591),d=t(7893),f=t(3100),x=t(2472);let u=e=>{let{cartItems:s,onOpenCart:t,onOpenWishlist:r}=e,[u,m]=(0,i.useState)(!1),[h,p]=(0,i.useState)(""),b=(0,o.useRouter)(),g=s.reduce((e,s)=>e+s.quantity,0);return(0,a.jsxs)("header",{className:"sticky top-0 z-50 bg-white shadow-md",children:[(0,a.jsx)("div",{className:"max-w-7xl mx-auto px-4",children:(0,a.jsxs)("div",{className:"flex justify-between items-center h-16",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)("button",{onClick:()=>m(!u),className:"md:hidden",children:u?(0,a.jsx)(l.A,{size:24}):(0,a.jsx)(c.A,{size:24})}),(0,a.jsx)("h1",{className:"text-xl font-bold",children:"Fashion Shop"})]}),(0,a.jsx)("div",{className:"hidden md:block flex-1 max-w-md mx-4",children:(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{type:"text",placeholder:"Search products...",value:h,onChange:e=>p(e.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"}),(0,a.jsx)(n.A,{className:"absolute left-3 top-2.5 w-5 h-5 text-gray-400"})]})}),(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)("button",{onClick:r,className:"p-2 hover:bg-gray-100 rounded-full",children:(0,a.jsx)(d.A,{className:"w-6 h-6"})}),(0,a.jsxs)("button",{onClick:t,className:"p-2 hover:bg-gray-100 rounded-full relative",children:[(0,a.jsx)(f.A,{className:"w-6 h-6"}),g>0&&(0,a.jsx)("span",{className:"absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center",children:g})]}),(0,a.jsx)("button",{className:"p-2 hover:bg-gray-100 rounded-full",onClick:()=>b.push("/account"),children:(0,a.jsx)(x.A,{className:"w-6 h-6"})})]})]})}),u&&(0,a.jsx)("div",{className:"md:hidden border-t",children:(0,a.jsx)("div",{className:"p-4 space-y-4",children:(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{type:"text",placeholder:"Search products...",value:h,onChange:e=>p(e.target.value),className:"w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"}),(0,a.jsx)(n.A,{className:"absolute left-3 top-2.5 w-5 h-5 text-gray-400"})]})})})]})};var m=t(6039),h=t(8173),p=t.n(h);let b=e=>{let{product:s,onAddToCart:t,onAddToWishlist:i}=e;return(0,a.jsx)(p(),{href:"/product/".concat(s.id),className:"block",children:(0,a.jsxs)("div",{className:"group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer",children:[(0,a.jsxs)("div",{className:"relative aspect-square overflow-hidden",children:[(0,a.jsx)("img",{src:s.images[0],alt:s.name,className:"object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"}),(0,a.jsx)("div",{className:"absolute top-2 right-2 space-y-2",children:(0,a.jsx)("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),i(s)},className:"p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors",children:(0,a.jsx)(d.A,{className:"w-5 h-5"})})})]}),(0,a.jsxs)("div",{className:"p-4",children:[(0,a.jsxs)("div",{className:"flex justify-between items-start mb-2",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"font-semibold text-lg",children:s.name}),(0,a.jsxs)("p",{className:"text-gray-600",children:["$",s.price]})]}),(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)(m.A,{className:"w-4 h-4 text-yellow-400 fill-current"}),(0,a.jsx)("span",{className:"ml-1 text-sm",children:s.rating})]})]}),(0,a.jsx)("div",{className:"flex gap-1 mb-3",children:s.colors.map(e=>(0,a.jsx)("div",{className:"w-4 h-4 rounded-full border border-gray-300",style:{backgroundColor:e.hex},title:e.name},e.name))}),(0,a.jsxs)("button",{onClick:e=>{e.preventDefault(),e.stopPropagation(),t(s)},className:"w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2",children:[(0,a.jsx)(f.A,{className:"w-4 h-4"}),"Add to Cart"]})]})]})})},g=[{name:"Black",hex:"#000000"},{name:"White",hex:"#FFFFFF"},{name:"Navy",hex:"#000080"},{name:"Red",hex:"#FF0000"}],w=[{id:"1",name:"Classic Cotton T-Shirt",description:"Premium cotton t-shirt with a comfortable fit and durability.",price:29.99,images:["https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1585487000143-9bcec9b8e483?q=80&w=1891&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1617383619176-593fe8bfcde4?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"tops",sizes:["XS","S","M","L","XL"],colors:g,inStock:!0,features:["100% organic cotton","Breathable fabric","Regular fit","Machine washable"],rating:4.5,reviews:[{id:"r1",userId:"u1",userName:"John Doe",rating:5,comment:"Great quality and comfortable fit!",date:"2024-02-01"}]},{id:"2",name:"Slim Fit Jeans",description:"Classic slim fit jeans made from premium denim.",price:59.99,images:["https://images.unsplash.com/photo-1551024559-d69bcf67d8d1?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1568613065038-396d25f1c222?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1495298599282-d8920eb5009b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"bottoms",sizes:["28","30","32","34","36"],colors:g,inStock:!0,features:["98% cotton, 2% elastane","Slim fit","Zip fly with button closure","Machine washable"],rating:4.2,reviews:[{id:"r2",userId:"u2",userName:"Jane Smith",rating:4,comment:"Good fit, but the color faded a bit after washing.",date:"2024-02-15"}]},{id:"3",name:"Elegant Evening Dress",description:"Stunning evening dress perfect for special occasions.",price:129.99,images:["https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?q=80&w=1919&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1551621955-fa07d4b1376b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1586078130702-d208859b6223?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"dresses",sizes:["S","M","L","XL"],colors:g,inStock:!0,features:["Satin fabric","Floor-length","Concealed zipper closure","Dry clean only"],rating:4.7,reviews:[{id:"r3",userId:"u3",userName:"Alice Johnson",rating:5,comment:"Absolutely stunning dress! Perfect for my event.",date:"2024-03-01"}]},{id:"4",name:"Winter Parka Jacket",description:"Warm and stylish parka jacket for cold weather.",price:149.99,images:["https://images.unsplash.com/photo-1561778233-89714b6f2033?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1461935793258-ac2ac2c930b2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1610171668003-2e86bd1cc902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"outerwear",sizes:["S","M","L","XL","XXL"],colors:g,inStock:!0,features:["Water-resistant fabric","Faux fur hood","Multiple pockets","Machine washable"],rating:4.6,reviews:[{id:"r4",userId:"u4",userName:"Bob Williams",rating:4,comment:"Keeps me warm and dry in the winter. Great jacket!",date:"2024-01-10"}]},{id:"5",name:"Leather Belt",description:"Genuine leather belt with a classic buckle.",price:39.99,images:["https://images.unsplash.com/photo-1623393807193-e095f7944161?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1610456684094-f0d7d8f2e714?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1502898746234-cdef14a6eec4?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"accessories",sizes:["S","M","L","XL"],colors:g,inStock:!0,features:["100% genuine leather","Classic buckle design","Adjustable length"],rating:4.3,reviews:[{id:"r5",userId:"u5",userName:"Charlie Brown",rating:5,comment:"High-quality belt that looks great with everything.",date:"2023-12-20"}]},{id:"6",name:"Striped Long Sleeve Shirt",description:"Comfortable long sleeve shirt with a stylish striped pattern.",price:34.99,images:["https://images.unsplash.com/photo-1509305717900-84f40e786d82?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1995&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"tops",sizes:["XS","S","M","L","XL"],colors:g,inStock:!1,features:["100% cotton","Classic Fit","Machine Washable"],rating:3.9,reviews:[{id:"r6",userId:"u6",userName:"David Lee",rating:4,comment:"Nice shirt, runs a little small.",date:"2023-11-15"}]},{id:"7",name:"Classic Aviator Sunglasses",description:"Timeless aviator sunglasses with a lightweight metal frame and polarized lenses.",price:79.99,images:["https://images.unsplash.com/photo-1507518858358-37352945c171?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1603437229473-42c27161c85d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1581145448447-225410c911e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"accessories",sizes:["One Size"],colors:g,inStock:!0,features:["Polarized lenses","100% UV protection","Lightweight metal frame","Adjustable nose pads"],rating:4.8,reviews:[{id:"r7",userId:"u7",userName:"Emily Davis",rating:5,comment:"Love these sunglasses! They are stylish and provide great protection from the sun.",date:"2024-03-05"},{id:"r8",userId:"u8",userName:"David Brown",rating:4,comment:"Good quality sunglasses, but the frame feels a little delicate.",date:"2024-02-20"}]},{id:"8",name:"Retro Square Sunglasses",description:"Stylish square sunglasses with a bold acetate frame for a vintage look.",price:69.99,images:["https://images.unsplash.com/photo-1556227846-87091552a844?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1581145449624-7c2b65430f5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1575535881572-3ef043c258f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"accessories",sizes:["One Size"],colors:g,inStock:!0,features:["Durable acetate frame","100% UV protection","Scratch-resistant lenses","Comfortable fit"],rating:4.5,reviews:[{id:"r9",userId:"u9",userName:"Michael Lee",rating:5,comment:"Great sunglasses for the price!  Love the retro style.",date:"2024-01-15"}]},{id:"10",name:"Sport Sunglasses",description:"Designed for athletes, these sunglasses feature a wraparound design and impact-resistant lenses.",price:89.99,images:["https://images.unsplash.com/photo-1620226017713-b7de2cdd476c?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1600366249664-acd65e33e5d2?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1675798828659-5558961c38db?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],category:"accessories",sizes:["One Size"],colors:g,inStock:!1,features:["Impact-resistant lenses","Wraparound design","Non-slip nose pads and temple tips","100% UV protection"],rating:4.6,reviews:[{id:"r10",userId:"u10",userName:"Sarah Johnson",rating:5,comment:"Perfect for running and cycling. They stay in place and the lenses are great.",date:"2023-12-01"}]}],j=[{id:"all",name:"All Products"},{id:"tops",name:"Tops"},{id:"bottoms",name:"Bottoms"},{id:"dresses",name:"Dresses"},{id:"outerwear",name:"Outerwear"},{id:"accessories",name:"Accessories"}];var D=t(7192);let y=()=>{let e=(0,o.useRouter)(),[s,t]=(0,i.useState)([]),[l,c]=(0,i.useState)("all"),[n,d]=(0,i.useState)([]),[f,x]=(0,i.useState)(!1),{total:m}=(0,D.k)(s),h="all"===l?w:w.filter(e=>e.category===l),p=e=>{t(s=>s.find(s=>s.product.id===e.id)?s.map(s=>s.product.id===e.id?{...s,quantity:s.quantity+1}:s):[...s,{product:e,quantity:1,selectedSize:e.sizes[0],selectedColor:e.colors[0]}]),x(!0)},g=e=>{d(s=>s.includes(e.id)?s.filter(s=>s!==e.id):[...s,e.id])},y=e=>{t(s=>s.filter(s=>s.product.id!==e))},v=(e,s)=>{s<1||t(t=>t.map(t=>t.product.id===e?{...t,quantity:s}:t))};return(0,a.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,a.jsx)(u,{cartItems:s,onOpenCart:()=>x(!0),onOpenWishlist:()=>{}}),(0,a.jsxs)("main",{className:"max-w-7xl mx-auto px-4 py-8",children:[(0,a.jsx)("div",{className:"mb-8 overflow-x-auto",children:(0,a.jsx)("div",{className:"flex gap-4",children:j.map(e=>(0,a.jsx)("button",{onClick:()=>c(e.id),className:"px-4 py-2 rounded-full whitespace-nowrap ".concat(l===e.id?"bg-black text-white":"bg-white text-gray-600 hover:bg-gray-100"),children:e.name},e.id))})}),(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",children:h.map(e=>(0,a.jsx)(b,{product:e,onAddToCart:p,onAddToWishlist:g},e.id))})]}),f&&(0,a.jsx)("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-50",children:(0,a.jsxs)("div",{className:"absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl",children:[(0,a.jsx)("div",{className:"p-4 border-b",children:(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)("h2",{className:"text-lg font-semibold",children:"Shopping Cart"}),(0,a.jsx)("button",{onClick:()=>x(!1),className:"p-2 hover:bg-gray-100 rounded-full",children:(0,a.jsx)(r.QCr,{className:"w-5 h-5"})})]})}),(0,a.jsx)("div",{className:"p-4 flex-1 overflow-y-auto",children:0===s.length?(0,a.jsx)("p",{className:"text-center text-gray-500",children:"Your cart is empty"}):(0,a.jsx)("div",{className:"space-y-4",children:s.map(e=>(0,a.jsxs)("div",{className:"flex gap-4 bg-white p-4 rounded-lg",children:[(0,a.jsx)("img",{src:e.product.images[0],alt:e.product.name,className:"w-20 h-20 object-cover rounded"}),(0,a.jsxs)("div",{className:"flex-1",children:[(0,a.jsx)("h3",{className:"font-semibold",children:e.product.name}),(0,a.jsxs)("p",{className:"text-gray-600",children:["$",e.product.price*e.quantity]}),(0,a.jsxs)("div",{className:"flex items-center gap-2 mt-2",children:[(0,a.jsx)("button",{onClick:()=>v(e.product.id,e.quantity-1),className:"p-1 rounded-full hover:bg-gray-100",children:"-"}),(0,a.jsx)("span",{children:e.quantity}),(0,a.jsx)("button",{onClick:()=>v(e.product.id,e.quantity+1),className:"p-1 rounded-full hover:bg-gray-100",children:"+"}),(0,a.jsx)("button",{onClick:()=>y(e.product.id),className:"ml-auto text-red-500 hover:text-red-600",children:"Remove"})]})]})]},e.product.id))})}),s.length>0&&(0,a.jsx)("div",{className:"border-t p-4 bg-white",children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex justify-between text-lg font-semibold",children:[(0,a.jsx)("span",{children:"Subtotal"}),(0,a.jsxs)("span",{children:["$",(0,D.k)(s).subtotal.toFixed(2)]})]}),(0,a.jsxs)("div",{className:"flex justify-between text-lg font-semibold",children:[(0,a.jsx)("span",{children:"Shipping"}),(0,a.jsxs)("span",{children:["$",(0,D.k)(s).shipping.toFixed(2)]})]}),(0,a.jsxs)("div",{className:"flex justify-between text-lg font-bold",children:[(0,a.jsx)("span",{children:"Total"}),(0,a.jsxs)("span",{children:["$",(0,D.k)(s).total.toFixed(2)]})]}),(0,a.jsx)("button",{onClick:()=>{e.push("/devenzy/checkout?cartData=".concat(encodeURIComponent(JSON.stringify(s))))},className:"w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors",children:"Checkout"})]})})]})})]})}},7192:(e,s,t)=>{"use strict";t.d(s,{k:()=>a});let a=e=>{let s=e.reduce((e,s)=>e+s.product.price*s.quantity,0);return{subtotal:s,shipping:10,total:s+10}}}},e=>{var s=s=>e(e.s=s);e.O(0,[711,833,431,441,517,358],()=>s(8578)),_N_E=e.O()}]);