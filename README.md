# 🍕 FOODIO - Modern Food Delivery Application

![Foodio](https://img.shields.io/badge/Foodio-FastFood%20Delivery-FF6B35?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Foodio is a modern, fast, and affordable food delivery application built with **React**, **TypeScript**, and **Tailwind CSS**. It provides a seamless experience for ordering delicious street food with WhatsApp integration for order confirmation.

## 🌟 Features

### Core Features
- 🍱 **Browse Menu** - Explore 25+ food items across 7 categories
- 🛒 **Shopping Cart** - Add/remove items with quantity control
- 📍 **Location-Based Delivery** - Automatic distance calculation (up to 4 KM)
- 💳 **WhatsApp Integration** - Order confirmation via WhatsApp
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🔍 **Search & Filter** - Find items by name or category
- ⭐ **Customer Reviews** - See real customer testimonials
- 💾 **Order History** - Track all your orders

### Categories
1. **Panipuri** - Spiced water balls with potato filling
2. **Bhel** - Puffed rice with spices
3. **Ragda Pattice** - Potato patties with white pea curry
4. **Sev Puri** - Crispy puri with potatoes
5. **Dahi Puri** - Yogurt and tangy water puri
6. **Sandwiches** - Fresh bread with vegetable fillings
7. **Beverages** - Cold drinks and refreshments

### Admin Dashboard
- 📊 Sales statistics and analytics
- 📦 Order management
- 🍽️ Product management
- 💰 Revenue tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/rushi-0001/foodio.git
cd foodio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
foodio/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Cart.tsx
│   │   ├── ProductCard.tsx
│   │   ├── LocationPermission.tsx
│   │   ├── CheckoutForm.tsx
│   │   ├── OrderConfirmation.tsx
│   │   ├── Reviews.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   │
│   ├── pages/               # Page components
│   │   ├── HomePage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── AdminPage.tsx
│   │   └── OrderSuccessPage.tsx
│   │
│   ├── data/                # Static data
│   │   ├── categories.ts
│   │   ├── products.ts
│   │   └── reviews.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── location.ts      # Geolocation & distance calculation
│   │   ├── whatsapp.ts      # WhatsApp integration
│   │   ├── cart.ts          # Cart management
│   │   ├── validation.ts    # Form validation
│   │   └── storage.ts       # LocalStorage helpers
│   │
│   ├── types/               # TypeScript interfaces
│   │   └── index.ts
│   │
│   ├── styles/              # Global styles
│   │   └── globals.css
│   │
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
│
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2.0** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS 3.3.6** - Utility-first CSS
- **PostCSS** - CSS processing
- **Autoprefixer** - Browser compatibility

### Icons
- **Lucide React** - Beautiful SVG icons

### APIs & Integrations
- **Geolocation API** - User location detection
- **Open Street Map Nominatim** - Address lookup (free, no API key required)
- **WhatsApp Web API** - Order confirmation via WhatsApp
- **LocalStorage** - Client-side data persistence

## 📊 Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  available: boolean;
  preparationTime: number;
  spicy: boolean;
}
```

### Order
```typescript
interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  deliveryDistance: number;
  status: OrderStatus;
  estimatedDeliveryTime: number;
  specialInstructions?: string;
  paymentMethod: 'whatsapp' | 'cash';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🌍 Location & Delivery

### Delivery Zones
- **0-2 KM**: ₹30 delivery charge
- **2-4 KM**: ₹50 delivery charge
- **4-6 KM**: ₹70 delivery charge
- **6-9 KM**: ₹100 delivery charge
- **Beyond 9 KM**: Not available

### Estimated Delivery Time
- Base time: 20 minutes
- Additional: 2 minutes per KM

## 🔄 User Journey

1. **Browse** - User views products and filters by category
2. **Select** - User adds items to cart
3. **Location** - User shares location or enters address manually
4. **Details** - User enters delivery information
5. **Confirm** - Order is generated with unique order number
6. **WhatsApp** - Order details are sent via WhatsApp to +91 7841967288

## 💬 WhatsApp Integration

Orders are sent to WhatsApp with formatted messages including:
- Customer details (name, phone, address)
- Order items and quantities
- Order summary (subtotal, delivery charge, total)
- Delivery information (distance, estimated time)
- Special instructions

**Order WhatsApp Number**: +91 7841967288

## 💾 Data Storage

- **Cart**: Stored in localStorage with key `foodio_cart`
- **Orders**: Stored in localStorage with key `foodio_orders`
- **Last Location**: Stored in localStorage with key `foodio_last_location`

## 🎨 Design System

### Colors
- **Primary**: #FF6B35 (Spicy Orange)
- **Secondary**: #F7931E (Warm Orange)
- **Accent**: #FDB833 (Golden)
- **Dark**: #1a1a1a (Near Black)
- **Light**: #f8f8f8 (Off White)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔐 Security Considerations

- All customer data is stored locally (no server)
- WhatsApp integration uses official web.whatsapp.com links
- Form validation prevents invalid data submission
- No sensitive payment information stored

## 🚦 Code Quality

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Build
```bash
npm run build
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Real payment gateway integration (Razorpay, PayPal)
- [ ] SMS notifications for order status
- [ ] Push notifications
- [ ] Admin authentication
- [ ] Database integration (Firebase/MongoDB)
- [ ] Real-time order tracking with map
- [ ] Multiple language support
- [ ] Rating and review system
- [ ] Loyalty/rewards program
- [ ] Scheduled orders
- [ ] Multiple payment methods

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💼 Author

**Om Rakesh Gaud** (rushi-0001)
- GitHub: [@rushi-0001](https://github.com/rushi-0001)
- Email: ogaud5677@gmail.com

## 📞 Support

For support and orders:
- **WhatsApp**: +91 7841967288
- **Email**: order@foodio.in
- **GitHub Issues**: [Report a bug](https://github.com/rushi-0001/foodio/issues)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for beautiful styling
- Lucide for beautiful icons
- Open Street Map for geolocation services
- All customers for their feedback

---

<div align="center">

**Made with ❤️ by Om Rakesh Gaud**

*Fast • Fresh • Affordable Food Delivery* 🍕

[⬆ back to top](#-foodio---modern-food-delivery-application)

</div>
