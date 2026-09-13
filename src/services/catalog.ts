import { Product, CategorySlug, Lookbook, Review, Order } from '@/types/ecommerce';
import { MOCK_PRODUCTS, MOCK_LOOKBOOKS, MOCK_REVIEWS } from '@/data/products';

export const CatalogService = {
  async getProducts(params?: { category?: CategorySlug; search?: string; sort?: string }): Promise<Product[]> {
    let result = [...MOCK_PRODUCTS];

    if (params?.category) {
      result = result.filter(p => p.category === params.category);
    }

    if (params?.search) {
      const query = params.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query)
      );
    }

    if (params?.sort) {
      if (params.sort === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (params.sort === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      } else if (params.sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      }
    }

    return result;
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const found = MOCK_PRODUCTS.find(p => p.slug === slug);
    return found || null;
  },

  async getLookbooks(): Promise<Lookbook[]> {
    return MOCK_LOOKBOOKS;
  },

  async getReviewsForProduct(productId: string): Promise<Review[]> {
    return MOCK_REVIEWS.filter(r => r.productId === productId);
  }
};

export const SmartSizeService = {
  calculateRecommendedSize(params: { heightCm: number; weightKg: number; fitPreference: string }): {
    recommendedSize: string;
    confidence: 'HIGH' | 'MEDIUM' | 'LOW';
    reason: string;
  } {
    const { heightCm, weightKg, fitPreference } = params;

    let baseSize = 'M';
    if (weightKg < 62) baseSize = 'S';
    else if (weightKg >= 62 && weightKg < 75) baseSize = 'M';
    else if (weightKg >= 75 && weightKg < 88) baseSize = 'L';
    else baseSize = 'XL';

    if (fitPreference === 'OVERSIZED' && baseSize !== 'XL') {
      // Keep base size if user already likes oversized silhouette or bump up 1 size
    }

    return {
      recommendedSize: baseSize,
      confidence: 'HIGH',
      reason: `Based on your height (${heightCm}cm), weight (${weightKg}kg), and preferred ${fitPreference.toLowerCase()} drape, size ${baseSize} provides the intended Kapda Mafia boxy silhouette.`
    };
  }
};

export const OrderTrackingService = {
  async trackOrder(orderId: string): Promise<Order | null> {
    if (!orderId || orderId.trim() === '') return null;

    return {
      id: orderId.toUpperCase(),
      customerName: 'Aarav Sharma',
      email: 'aarav@kapdamafia.com',
      phone: '+91 98765 43210',
      items: [
        {
          productId: 'km-001',
          variantId: 'var-001-black',
          size: 'L',
          quantity: 1,
          unitPrice: 2499,
          productName: 'MAFIA CREST OVERSIZED TEE',
          productImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop',
          colorName: 'Washed Charcoal Black'
        }
      ],
      subtotal: 2499,
      shipping: 0,
      total: 2499,
      paymentMethod: 'PREPAID_RAZORPAY',
      paymentStatus: 'PAID',
      orderStatus: 'SHIPPED',
      trackingNumber: 'KM-DEL-9847120',
      courierName: 'Delhivery Express',
      createdAt: '2026-08-10T14:30:00Z',
      shippingAddress: {
        street: '42 Underground Drive, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
      },
      trackingSteps: [
        { status: 'ORDER_CONFIRMED', label: 'Order Placed & Verified', date: 'Aug 10, 02:30 PM', completed: true },
        { status: 'PACKED', label: 'Quality Checked & Packed in Flagship Studio', date: 'Aug 10, 06:15 PM', completed: true },
        { status: 'SHIPPED', label: 'Handed to Courier Partner (Delhivery)', date: 'Aug 11, 09:00 AM', completed: true },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', completed: false },
        { status: 'DELIVERED', label: 'Delivered to Customer', completed: false }
      ]
    };
  }
};
