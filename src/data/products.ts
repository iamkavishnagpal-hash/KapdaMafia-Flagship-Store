import { Product, Lookbook, Review } from '@/types/ecommerce';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'km-001',
    slug: 'heavyweight-mafia-crest-tee',
    name: 'MAFIA CREST OVERSIZED TEE',
    tagline: '400 GSM Heavyweight French Cotton with Vintage Washed Finish',
    category: 'tees',
    price: 2499,
    originalPrice: 3499,
    badge: 'LIMITED',
    dropName: 'DROP 09 — AFTER DARK',
    description: 'Constructed from custom-knit 400 GSM French Terry cotton. Features dropped shoulder silhouette, raw distressed hems, high-density puff print emblem on front and back.',
    fit: 'OVERSIZED',
    gsm: 400,
    fabricDetails: ['100% French Terry Cotton', '400 GSM Heavyweight', 'Pre-shrunk vintage bio-wash', 'High-density matte print'],
    careInstructions: ['Machine wash cold inside out', 'Do not tumble dry', 'Iron inside out on low heat'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'MBB-TEE-001',
      hsnCode: '61091000',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true,
    variants: [
      {
        id: 'var-001-black',
        colorName: 'Washed Charcoal Black',
        colorHex: '#181818',
        sizes: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 2 },
          { size: 'XL', stock: 0 },
          { size: 'XXL', stock: 5 }
        ],
        images: [
          { id: 'img-1', url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Mafia Crest Tee Studio Front', view: 'hero' },
          { id: 'img-2', url: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Mafia Crest Tee Back', view: 'back' },
          { id: 'img-3', url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Model Wearing Oversized Tee', view: 'model' },
          { id: 'img-4', url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Macro Fabric Stitch Detail', view: 'detail' }
        ]
      }
    ]
  },
  {
    id: 'km-002',
    slug: 'tactical-multi-pocket-cargo',
    name: 'TACTICAL REBEL CARGO PANTS',
    tagline: 'Water-Resistant Ripstop Canvas with 8 Modular Utility Pockets',
    category: 'cargos',
    price: 3999,
    originalPrice: 4999,
    badge: 'LIMITED',
    dropName: 'DROP 09 — AFTER DARK',
    description: 'Heavy-duty 340 GSM cotton-poly ripstop canvas built for durability and street aesthetics. Adjustable ankle cinch cords, custom metal hardware, and 8 modular 3D bellowed pockets.',
    fit: 'BAGGY',
    gsm: 340,
    fabricDetails: ['65% Cotton, 35% Polyester Ripstop', 'Water & stain repellent coating', 'YKK zippers & tactical buckles', 'Reinforced knee panels'],
    careInstructions: ['Hand wash or cold gentle cycle', 'Hang dry in shade', 'Do not bleach'],
    modelInfo: {
      height: "5'11\" (180 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'MBB-CARGO-002',
      hsnCode: '62034200',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 29,
    isFeatured: true,
    variants: [
      {
        id: 'var-002-black',
        colorName: 'Tactical Matte Black',
        colorHex: '#111111',
        sizes: [
          { size: 'S', stock: 8 },
          { size: 'M', stock: 3 },
          { size: 'L', stock: 15 },
          { size: 'XL', stock: 6 }
        ],
        images: [
          { id: 'img-5', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Tactical Cargo Pants Industrial Studio', view: 'hero' },
          { id: 'img-6', url: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Cargo Pocket Hardware Detail', view: 'detail' }
        ]
      }
    ]
  },
  {
    id: 'km-003',
    slug: 'underground-monogram-heavy-hoodie',
    name: 'UNDERGROUND MONOGRAM HOODIE',
    tagline: '500 GSM Double-Faced Fleece with Embossed Rubber Branding',
    category: 'hoodies',
    price: 4499,
    originalPrice: 5999,
    badge: 'NEW',
    dropName: 'DROP 09 — AFTER DARK',
    description: 'Ultra-heavyweight 500 GSM loopback organic cotton fleece. Features a double-layered structured hood, no drawstrings for a sleek silhouette, and rubberized 3D tactile branding on chest.',
    fit: 'OVERSIZED',
    gsm: 500,
    fabricDetails: ['100% Organic Heavy Fleece', '500 GSM Structured Knit', 'Double-layer 3D hood', 'Seamless side construction'],
    careInstructions: ['Dry clean recommended', 'Cold gentle wash inside out', 'Flat dry'],
    modelInfo: {
      height: "6'0\" (183 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'MBB-HOOD-003',
      hsnCode: '61102000',
      taxRatePercentage: 12
    },
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true,
    variants: [
      {
        id: 'var-003-wine',
        colorName: 'Obsidian Black / Deep Charcoal',
        colorHex: '#181818',
        sizes: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 5 },
          { size: 'L', stock: 1 },
          { size: 'XL', stock: 7 }
        ],
        images: [
          { id: 'img-7', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Heavyweight Hoodie Street Editorial', view: 'hero' },
          { id: 'img-8', url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Hoodie Night City Campaign', view: 'model' }
        ]
      }
    ]
  },
  {
    id: 'km-004',
    slug: 'raw-edge-baggy-vintage-denim',
    name: 'DESTROYED RAW EDGE DENIM',
    tagline: '14.5 oz Rigid Japanese Selvedge Denim with Hand Distressing',
    category: 'denim',
    price: 4999,
    originalPrice: 6499,
    badge: 'BEST SELLER',
    dropName: 'DROP 08 — RAW UNIVERSE',
    description: '14.5 oz custom-milled rigid selvedge denim. Individually hand-distressed with laser whisker marks, raw frayed leg openings, and custom matte silver Mafia rivet hardware.',
    fit: 'BAGGY',
    gsm: 450,
    fabricDetails: ['100% Cotton 14.5 oz Selvedge Denim', 'Hand washed acid treatment', 'Embossed leather waistband patch', 'Custom metal shank buttons'],
    careInstructions: ['Wash rarely', 'Turn inside out in cold water', 'Line dry in shade'],
    modelInfo: {
      height: "6'2\" (188 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'MBB-DNM-004',
      hsnCode: '62034210',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 31,
    isFeatured: true,
    variants: [
      {
        id: 'var-004-denim',
        colorName: 'Vintage Charcoal Wash',
        colorHex: '#222222',
        sizes: [
          { size: 'S', stock: 2 },
          { size: 'M', stock: 6 },
          { size: 'L', stock: 9 },
          { size: 'XL', stock: 4 }
        ],
        images: [
          { id: 'img-9', url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Destroyed Vintage Denim', view: 'hero' },
          { id: 'img-10', url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Denim Hardware Detail', view: 'detail' }
        ]
      }
    ]
  },
  {
    id: 'km-005',
    slug: 'hyper-boxy-flight-bomber',
    name: 'HYPER-BOXY CYBER BOMBER',
    tagline: 'Insulated Crinkled Nylon with Matte Gunmetal Cobra Buckle Harness',
    category: 'jackets',
    price: 6499,
    originalPrice: 8999,
    badge: 'LIMITED',
    dropName: 'DROP 09 — AFTER DARK',
    description: 'Extreme drop-shoulder cropped torso silhouette. Engineered with industrial high-sheen crinkled nylon, custom utility sleeve pockets, and thermal poly-fill quilt lining.',
    fit: 'OVERSIZED',
    gsm: 480,
    fabricDetails: ['100% High-Density Crinkled Nylon Outer', 'Thermal Quilted Micro-fleece Lining', 'Custom Matte Gunmetal Hardware', 'Storm-proof Ribbed Collar & Cuffs'],
    careInstructions: ['Dry clean only', 'Do not iron shell', 'Store on padded hanger'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'MBB-BMB-005',
      hsnCode: '62019000',
      taxRatePercentage: 12
    },
    rating: 5.0,
    reviewCount: 19,
    isFeatured: true,
    variants: [
      {
        id: 'var-005-black',
        colorName: 'Pitch Obsidian',
        colorHex: '#0d0d0d',
        sizes: [
          { size: 'S', stock: 3 },
          { size: 'M', stock: 7 },
          { size: 'L', stock: 4 },
          { size: 'XL', stock: 1 }
        ],
        images: [
          { id: 'img-11', url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Hyper-Boxy Flight Bomber Editorial', view: 'hero' },
          { id: 'img-12', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Bomber Jacket Zipper Detail', view: 'detail' }
        ]
      }
    ]
  },
  {
    id: 'km-006',
    slug: 'ballistic-balloon-parachute-pants',
    name: 'BALLOON PARACHUTE PANTS',
    tagline: 'Ultralight Matte Taslan with Dual Knee Articulation & Bungee Toggles',
    category: 'cargos',
    price: 3799,
    originalPrice: 4799,
    badge: 'NEW',
    dropName: 'DROP 09 — AFTER DARK',
    description: 'Volume-stacked balloon fit cut from matte water-resistant Taslan. Features double-pleated articulated knees, bungee toggle hem cinch, and oversized concealed slant pockets.',
    fit: 'BAGGY',
    gsm: 280,
    fabricDetails: ['100% Matte Taslan Nylon', 'DWR Water-Repellent Finish', 'Elasticated Drawstring Waistband with Cord Locks', 'Bar-tack Reinforced Seams'],
    careInstructions: ['Machine wash cold gentle', 'Hang dry in shade', 'Do not iron'],
    modelInfo: {
      height: "5'11\" (180 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'MBB-PCH-006',
      hsnCode: '62034300',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 24,
    isFeatured: true,
    variants: [
      {
        id: 'var-006-olive',
        colorName: 'Shadow Washed Olive',
        colorHex: '#1e241d',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 11 },
          { size: 'L', stock: 8 },
          { size: 'XL', stock: 2 }
        ],
        images: [
          { id: 'img-13', url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Balloon Parachute Pants Street Style', view: 'hero' },
          { id: 'img-14', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop', type: 'image', alt: 'Parachute Pant Toggle Detail', view: 'detail' }
        ]
      }
    ]
  }
];

export const MOCK_LOOKBOOKS: Lookbook[] = [
  {
    id: 'lb-01',
    code: 'LOOK 01',
    title: 'AFTER DARK',
    subtitle: 'NIGHT RUNNER SILHOUETTE',
    heroImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1600&auto=format&fit=crop',
    description: 'Oversized crest tee paired with tactical cargo pants and Chunky Vulcan platform kicks. Designed for high contrast in low-light urban environments.',
    productIds: ['km-001', 'km-002']
  },
  {
    id: 'lb-02',
    code: 'LOOK 02',
    title: 'MONOLITH REBEL',
    subtitle: '500 GSM HEAVYWEIGHT PROTOCOL',
    heroImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1600&auto=format&fit=crop',
    description: 'Deep crimson monogram fleece styled with hand-distressed selvedge denim. Heavy drape meets structured luxury craftsmanship.',
    productIds: ['km-003', 'km-004']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    productId: 'km-001',
    authorName: 'Aarav M.',
    rating: 5,
    date: '2026-08-04',
    title: 'Insane quality. Actual 400 GSM heavy fabric.',
    comment: 'Was skeptical about the price, but the weight of this tee is unlike anything else in India. Boxy drape is perfect, doesn’t shrink after wash.',
    verifiedPurchase: true,
    userFitRating: 'True to size',
    userHeightWeight: "6'1\" / 78 kg",
    purchasedSize: 'L'
  },
  {
    id: 'rev-102',
    productId: 'km-001',
    authorName: 'Karan V.',
    rating: 5,
    date: '2026-08-01',
    title: 'Finally a streetwear brand that feels expensive.',
    comment: 'The puff print details are crisp and the washed finish looks extremely high-end. Got compliments on the first day wearing it.',
    verifiedPurchase: true,
    userFitRating: 'Runs large',
    userHeightWeight: "5'10\" / 72 kg",
    purchasedSize: 'M'
  }
];
