import type { ShopProduct } from '@/content/shop';

export type OrderShipping = {
  name: string;
  email: string;
  phone: string;
  line1: string;
  city: string;
  country: string;
  postal: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  unit?: string;
  slug?: string;
  category?: ShopProduct['category'];
};

export type StoredOrder = {
  id: string;
  items: OrderItem[];
  shipping: OrderShipping;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  status: 'confirmed';
  fulfillmentType?: 'PHYSICAL' | 'DIGITAL';
};
