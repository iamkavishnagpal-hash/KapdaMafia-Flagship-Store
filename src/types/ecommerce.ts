export type CategorySlug = 
  | 'tees'
  | 'hoodies'
  | 'cargos'
  | 'denim'
  | 'jackets'
  | 'sneakers'
  | 'caps'
  | 'accessories';

export type ProductBadge = 'NEW' | 'LIMITED' | 'LOW STOCK' | 'BEST SELLER' | 'RESTOCK';

export type FitType = 'OVERSIZED' | 'BAGGY' | 'RELAXED' | 'REGULAR' | 'BOXY';

export interface ProductMedia {
  id: string;
  url: string;
  type: 'image' | 'video';
  alt: string;
  view: 'hero' | 'front' | 'back' | 'model' | 'detail' | 'texture';
}

export interface SizeStock {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'UK7' | 'UK8' | 'UK9' | 'UK10' | 'ONE SIZE';
  stock: number;
}

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  sizes: SizeStock[];
  images: ProductMedia[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  badge?: ProductBadge;
  dropName?: string;
  description: string;
  fit: FitType;
  gsm?: number;
  fabricDetails: string[];
  careInstructions: string[];
  modelInfo?: {
    height: string;
    wearingSize: string;
  };
  variants: ProductVariant[];
  myBillBookMeta: {
    itemId: string;
    hsnCode: string;
    taxRatePercentage: number;
  };
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  userFitRating: 'True to size' | 'Runs large' | 'Runs small';
  userHeightWeight?: string;
  purchasedSize: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  size: string;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  freeShippingThreshold: number;
  total: number;
}

export interface OrderItem extends CartItem {
  productName: string;
  productImage: string;
  colorName: string;
}

export type OrderStatus = 'ORDER_CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

export interface OrderTrackingStep {
  status: OrderStatus;
  label: string;
  date?: string;
  completed: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: 'PREPAID_RAZORPAY' | 'CASH_ON_DELIVERY';
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  orderStatus: OrderStatus;
  trackingSteps: OrderTrackingStep[];
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface Lookbook {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  productIds: string[];
}
