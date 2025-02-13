# Next.js 15 E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, featuring a responsive design, admin dashboard, and seamless payment processing.

![Project Version](https://img.shields.io/badge/Next.js-15.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **User Authentication**: Secure Firebase authentication system
- **Product Management**: Complete admin dashboard for product management
- **Shopping Experience**:
  - Interactive product galleries
  - Shopping cart functionality
  - Secure checkout process
  - Payment processing integration
- **Responsive Design**: Mobile-first approach using modern UI components
- **Admin Features**:
  - Protected admin routes
  - Product creation and management
  - Order tracking
  - Dashboard analytics

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Firebase account
- Stripe account (for payments)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
STRIPE_SECRET_KEY=your_stripe_secret
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
├── app/                      # Next.js 15 app directory
│   ├── account/             # User account pages
│   ├── admin/               # Admin section
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── manage-products/ # Product management
│   ├── checkout/           # Checkout process
│   └── product/            # Product pages
├── components/             # React components
│   ├── admin/             # Admin-specific components
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project
2. Enable Authentication and Firestore
3. Add your Firebase configuration to `lib/firebase.ts`

### Stripe Integration

1. Create a Stripe account
2. Add your Stripe secret key to environment variables
3. Configure webhook endpoints

## 🛠️ Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)

### Adding New Products

Use the admin dashboard or the script:

```bash
npm run upload-products
```

## 📱 Features Implementation

### Authentication Flow

The application uses Firebase Authentication with the following features:

- Email/Password authentication
- Admin role management
- Protected routes

### Product Management

Admins can:

- Create/Edit/Delete products
- Manage inventory
- View orders
- Process refunds

### Shopping Cart

Implemented using React Context with:

- Persistent storage
- Real-time updates
- Price calculations

## 🔐 Security

- Protected API routes
- Secure admin authentication
- XSS protection
- CSRF prevention
- Rate limiting on sensitive endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)

## 📞 Support

For support, email chamarasecu.21@gmail.com or open an issue in the repository.
