import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    productId: 'panipuri-1',
    customerName: 'Rajesh Kumar',
    rating: 5,
    comment: 'Best panipuri in town! Fresh and tasty. Highly recommend!',
    createdAt: new Date('2026-06-10'),
  },
  {
    id: '2',
    productId: 'ragda-1',
    customerName: 'Priya Singh',
    rating: 4,
    comment: 'Good quality and taste. Delivery was fast!',
    createdAt: new Date('2026-06-11'),
  },
  {
    id: '3',
    productId: 'dahi-puri-2',
    customerName: 'Amit Patel',
    rating: 5,
    comment: 'Absolutely delicious! The dahi is creamy and fresh.',
    createdAt: new Date('2026-06-12'),
  },
  {
    id: '4',
    productId: 'sandwich-2',
    customerName: 'Sneha Sharma',
    rating: 4,
    comment: 'Cheese was melted perfectly. Will order again!',
    createdAt: new Date('2026-06-09'),
  },
  {
    id: '5',
    productId: 'beverage-4',
    customerName: 'Vikram Singh',
    rating: 5,
    comment: 'Best mango lassi ever! So creamy and refreshing.',
    createdAt: new Date('2026-06-08'),
  },
];

export const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Pune',
    rating: 5,
    comment: 'Foodio is my go-to app for quick, delicious meals. Always fresh!',
    avatar: '👨',
  },
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    comment: 'Amazing service and super fast delivery. Love the variety!',
    avatar: '👩',
  },
  {
    name: 'Amit Desai',
    location: 'Pune',
    rating: 4,
    comment: 'Great taste, reasonable prices. Highly recommended!',
    avatar: '👨',
  },
];
