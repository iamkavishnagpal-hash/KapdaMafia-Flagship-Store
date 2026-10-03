import { Product, CategorySlug, Lookbook, Review, Order } from '@/types/ecommerce';
import { MOCK_PRODUCTS, MOCK_LOOKBOOKS, MOCK_REVIEWS } from '@/data/products';

export const CatalogService = {
  async getProducts(params?: { category?: CategorySlug; search?: string; sort?: string; world?: 'clothing' | 'shoes' }): Promise<Product[]> {
    let result = [...MOCK_PRODUCTS];

    if (params?.world) {
      if (params.world === 'shoes') {
        result = result.filter(p => p.storeWorld === 'shoes');
      } else {
        result = result.filter(p => p.storeWorld !== 'shoes');
      }
    }

    if (params?.category) {
      const cat = params.category;
      if (cat === 'topwear') {
        result = result.filter(p => p.category === 'tees' || p.category === 'hoodies' || p.category === 'jackets');
      } else if (cat === 'bottomwear') {
        result = result.filter(p => p.category === 'cargos' || p.category === 'denim');
      } else if (cat === 'winterwear') {
        result = result.filter(p => p.category === 'hoodies' || p.category === 'jackets' || (p.gsm && p.gsm >= 380));
      } else if (cat === 'coord-sets') {
        result = result.filter(p => p.category === 'cargos' || p.name.includes('PANELED') || p.name.includes('TRACKPANT') || p.tagline.toLowerCase().includes('set'));
      } else if (cat === 'basics') {
        result = result.filter(p => p.category === 'tees' || p.name.includes('STRIPED') || p.price < 1500);
      } else {
        result = result.filter(p => p.category === cat);
      }
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

    const isShoeOrder = orderId.toUpperCase().startsWith('SM') || orderId.toLowerCase().includes('shoe');

    if (isShoeOrder) {
      return {
        id: orderId.toUpperCase(),
        customerName: 'Aarav Sharma',
        email: 'aarav@kapdamafia.com',
        phone: '+91 98765 43210',
        items: [
          {
            productId: 'bb-114',
            variantId: 'var-bb-114',
            size: 'UK 8',
            quantity: 1,
            unitPrice: 499,
            productName: '1239 CUSHION FOAM HIGH-STREET SNEAKER',
            productImage: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg',
            colorName: 'Slate White'
          }
        ],
        subtotal: 499,
        shipping: 99,
        total: 598,
        paymentMethod: 'PREPAID_RAZORPAY',
        paymentStatus: 'PAID',
        orderStatus: 'SHIPPED',
        trackingNumber: 'SM-DEL-4829104',
        courierName: 'Delhivery Surface Express',
        createdAt: '2026-08-12T11:00:00Z',
        shippingAddress: {
          street: '42 Underground Drive, Bandra West',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400050'
        },
        trackingSteps: [
          { status: 'ORDER_CONFIRMED', label: 'Shoes Mafia Order Confirmed & Verified', date: 'Aug 12, 11:00 AM', completed: true },
          { status: 'PACKED', label: 'Footwear Quality Inspected & Box Sealed', date: 'Aug 12, 03:30 PM', completed: true },
          { status: 'SHIPPED', label: 'Dispatched from Shoes Mafia Central Hub (Faridabad NIT-5)', date: 'Aug 13, 08:00 AM', completed: true },
          { status: 'OUT_FOR_DELIVERY', label: 'Out for Final Delivery', completed: false },
          { status: 'DELIVERED', label: 'Delivered to Customer Doorstep', completed: false }
        ]
      };
    }

    return {
      id: orderId.toUpperCase(),
      customerName: 'Aarav Sharma',
      email: 'aarav@kapdamafia.com',
      phone: '+91 98765 43210',
      items: [
        {
          productId: 'pl-001',
          variantId: 'var-pl-001',
          size: 'L',
          quantity: 1,
          unitPrice: 1899,
          productName: 'DARK BLUE BARREL FIT JEANS',
          productImage: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
          colorName: 'Dark Indigo Blue'
        }
      ],
      subtotal: 2499,
      shipping: 0,
      total: 2499,
      paymentMethod: 'PREPAID_RAZORPAY',
      paymentStatus: 'PAID',
      orderStatus: 'SHIPPED',
      trackingNumber: 'KM-DEL-9847120',
      courierName: 'Delhivery Air Express',
      createdAt: '2026-08-10T14:30:00Z',
      shippingAddress: {
        street: '42 Underground Drive, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050'
      },
      trackingSteps: [
        { status: 'ORDER_CONFIRMED', label: 'Kapda Mafia Order Placed & Verified', date: 'Aug 10, 02:30 PM', completed: true },
        { status: 'PACKED', label: 'Heavyweight Garments Packed in Flagship Studio', date: 'Aug 10, 06:15 PM', completed: true },
        { status: 'SHIPPED', label: 'Handed to Courier Partner (Delhivery Express)', date: 'Aug 11, 09:00 AM', completed: true },
        { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', completed: false },
        { status: 'DELIVERED', label: 'Delivered to Customer', completed: false }
      ]
    };
  }
};
