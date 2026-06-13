// Product and Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Product {
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

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  deliveryDistance: number;
  isDeliveryAvailable: boolean;
}

export interface LocationError {
  code: number;
  message: string;
}

// Customer Types
export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  latitude: number;
  longitude: number;
}

// Order Types
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
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
  completedAt?: Date;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Admin Types
export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  averageOrderValue: number;
  todaySales: number;
  thisWeekSales: number;
}

export interface AdminProduct extends Product {
  stock: number;
  cost: number;
  profit: number;
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  spicy?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
