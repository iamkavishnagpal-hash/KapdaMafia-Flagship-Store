import { Product, Lookbook, Review } from '@/types/ecommerce';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'pl-001',
    slug: 'dark-blue-barrel-fit-jeans',
    name: 'DARK BLUE BARREL FIT JEANS',
    tagline: 'Heavyweight Rigid Cotton Denim with Structured Curved Leg Silhouette',
    category: 'denim',
    price: 1899,
    originalPrice: 2699,
    badge: 'GEN-Z TREND',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Engineered with premium rigid cotton denim in a deep indigo wash. Features the signature Gen-Z barrel-leg curve, relaxed rise, and vintage whiskering treatment.',
    fit: 'BAGGY',
    gsm: 440,
    fabricDetails: ['100% Cotton Rigid Denim', 'Custom heavy contrast stitching', 'Deep indigo stone-wash', 'Mafia metallic rivets'],
    careInstructions: ['Wash inside out with cold water', 'Line dry in shade', 'Do not bleach'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: '32'
    },
    myBillBookMeta: {
      itemId: 'PL-JEAN-001',
      hsnCode: '62034200',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 47,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-001',
        colorName: 'Dark Indigo Blue',
        colorHex: '#1c2438',
        sizes: [
          { size: 'S', stock: 6 },
          { size: 'M', stock: 14 },
          { size: 'L', stock: 8 },
          { size: 'XL', stock: 4 }
        ],
        images: [
          { id: 'pl-img-1', url: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605', type: 'image', alt: 'Dark Blue Barrel Fit Jeans', view: 'hero' },
          { id: 'pl-img-1b', url: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605', type: 'image', alt: 'Jeans Detail', view: 'detail' }
        ]
      }
    ]
  },
  {
    id: 'pl-002',
    slug: 'black-and-white-striped-t-shirt',
    name: 'BLACK AND WHITE STRIPED T-SHIRT',
    tagline: '280 GSM Premium Combed Cotton in Relaxed Boxy Silhouette',
    category: 'tees',
    price: 1449,
    originalPrice: 1999,
    badge: 'BEST SELLER',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Yarn-dyed monochrome stripe pattern constructed from 280 GSM combed cotton. Dropped shoulder seams and reinforced ribbed collar for an effortless streetwear drape.',
    fit: 'OVERSIZED',
    gsm: 280,
    fabricDetails: ['100% Combed Heavy Cotton', 'Yarn-dyed horizontal stripe pattern', 'Drop-shoulder boxy cut', 'Pre-shrunk fabric'],
    careInstructions: ['Machine wash cold gentle', 'Hang dry', 'Warm iron if needed'],
    modelInfo: {
      height: "6'0\" (183 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-TEE-002',
      hsnCode: '61091000',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 39,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-002',
        colorName: 'Monochrome Stripe',
        colorHex: '#222222',
        sizes: [
          { size: 'S', stock: 8 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 5 },
          { size: 'XL', stock: 2 }
        ],
        images: [
          { id: 'pl-img-2', url: 'https://www.powerlook.in/cdn/shop/files/2_4b938529-ec1a-4ee8-937f-540ba48bc2dc.jpg?v=1759921304', type: 'image', alt: 'Black And White Striped T-Shirt', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-003',
    slug: 'multicolor-boxy-printed-t-shirt',
    name: 'MULTICOLOR BOXY PRINTED T-SHIRT',
    tagline: '100% Heavyweight Cotton with Cyber Graphic Art',
    category: 'tees',
    price: 1199,
    originalPrice: 1699,
    badge: 'NEW',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Custom boxy silhouette with high-density screenprint graphic inspired by Tokyo subcultures. Built from 100% premium breathable cotton.',
    fit: 'OVERSIZED',
    gsm: 260,
    fabricDetails: ['100% Pure Bio-Washed Cotton', 'Distressed vintage front print', 'Thick ribbed collar', 'Seamless body finish'],
    careInstructions: ['Iron inside out only', 'Machine wash cold', 'Do not tumble dry'],
    modelInfo: {
      height: "5'11\" (180 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'PL-TEE-003',
      hsnCode: '61091000',
      taxRatePercentage: 12
    },
    rating: 4.7,
    reviewCount: 28,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-003',
        colorName: 'Multicolor Washed',
        colorHex: '#333333',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 9 },
          { size: 'L', stock: 4 },
          { size: 'XL', stock: 3 }
        ],
        images: [
          { id: 'pl-img-3', url: 'https://www.powerlook.in/cdn/shop/files/4_e933779f-2bf8-442e-8e66-f2d137b7b628.jpg?v=1780054457', type: 'image', alt: 'Multicolor Boxy Printed T-Shirt', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-004',
    slug: 'grey-melange-paneled-baggy-trackpant',
    name: 'GREY MELANGE PANELED BAGGY TRACKPANT',
    tagline: 'Ultra-Dense Loopback Fleece with Articulated Side Cutlines',
    category: 'cargos',
    price: 1799,
    originalPrice: 2499,
    badge: 'LIMITED',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Voluminous stacked drape engineered with architectural contrast panelling. Adjustable bungee cord ankles and thick cotton drawstrings.',
    fit: 'BAGGY',
    gsm: 380,
    fabricDetails: ['80% Cotton, 20% Poly Loopback', 'Pre-washed anti-pilling finish', 'Heavyweight ribbed waistband', 'Concealed deep pocket bags'],
    careInstructions: ['Machine wash cold', 'Line dry in shade'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-TRK-004',
      hsnCode: '61034200',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 52,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-004',
        colorName: 'Grey Melange',
        colorHex: '#7f7f7f',
        sizes: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 10 },
          { size: 'L', stock: 15 },
          { size: 'XL', stock: 6 }
        ],
        images: [
          { id: 'pl-img-4', url: 'https://www.powerlook.in/cdn/shop/files/5_3x_b697cc80-2592-4205-b80b-903930ceac49.jpg?v=1787549048', type: 'image', alt: 'Grey Melange Paneled Baggy Trackpant', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-005',
    slug: 'black-paneled-baggy-trackpant',
    name: 'BLACK PANELED BAGGY TRACKPANT',
    tagline: 'Stealth Black Architectural Panelling with Modular Hem Bungees',
    category: 'cargos',
    price: 1899,
    originalPrice: 2599,
    badge: 'BEST SELLER',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'High-density stealth black cotton fleece crafted in a voluminous streetwear cut. Double-panel side seams create natural structure whether worn loose or cinched at the ankles.',
    fit: 'BAGGY',
    gsm: 380,
    fabricDetails: ['100% French Loopback Cotton', 'Matte black hardware', 'Extra deep utility pockets', 'Elasticated drawstring waist'],
    careInstructions: ['Wash inside out in cold water', 'Do not tumble dry'],
    modelInfo: {
      height: "6'0\" (183 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'PL-TRK-005',
      hsnCode: '61034200',
      taxRatePercentage: 12
    },
    rating: 5.0,
    reviewCount: 64,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-005',
        colorName: 'Pitch Black',
        colorHex: '#111111',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 8 },
          { size: 'XL', stock: 3 }
        ],
        images: [
          { id: 'pl-img-5', url: 'https://www.powerlook.in/cdn/shop/files/7_3x_888d77c3-7b5a-4a6f-bf88-66c15809bf99.jpg?v=1787637637', type: 'image', alt: 'Black Paneled Baggy Trackpant', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-006',
    slug: 'cream-paneled-baggy-trackpant',
    name: 'CREAM PANELED BAGGY TRACKPANT',
    tagline: 'Warm Ivory Tonal Cutlines with Relaxed Wide Silhouette',
    category: 'cargos',
    price: 1799,
    originalPrice: 2499,
    badge: 'NEW',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Clean warm cream aesthetic designed for luxury streetwear layering. Contrast tonal panels give subtle dimension in natural light.',
    fit: 'BAGGY',
    gsm: 380,
    fabricDetails: ['100% Heavyweight Cotton Fleece', 'Pre-shrunk vintage wash', 'Twin-needle reinforced stitching', 'Custom barrel cuff adjusters'],
    careInstructions: ['Cold wash with similar colors', 'Hang dry'],
    modelInfo: {
      height: "5'11\" (180 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'PL-TRK-006',
      hsnCode: '61034200',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 31,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-006',
        colorName: 'Ivory Cream',
        colorHex: '#eae5d8',
        sizes: [
          { size: 'S', stock: 7 },
          { size: 'M', stock: 8 },
          { size: 'L', stock: 6 },
          { size: 'XL', stock: 2 }
        ],
        images: [
          { id: 'pl-img-6', url: 'https://www.powerlook.in/cdn/shop/files/1_3x_e4e27b70-b1c7-48e6-8949-a1b7f7588b05.jpg?v=1787636214', type: 'image', alt: 'Cream Paneled Baggy Trackpant', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-007',
    slug: 'beige-panelled-barrel-fit-trackpant',
    name: 'BEIGE PANELLED BARREL FIT TRACKPANT',
    tagline: 'Curved Barrel Leg Fit with Tactical Piping Detail',
    category: 'cargos',
    price: 1799,
    originalPrice: 2499,
    badge: 'GEN-Z TREND',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Engineered curve profile that stacks cleanly over chunky sneakers. Made from 380 GSM textured French terry with architectural panel work.',
    fit: 'BAGGY',
    gsm: 380,
    fabricDetails: ['100% Premium Cotton Terry', 'Barrel-leg curve pattern', 'Matte metallic eyelets', 'Heavy drawcords'],
    careInstructions: ['Cold gentle wash', 'Do not bleach'],
    modelInfo: {
      height: "6'2\" (188 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-TRK-007',
      hsnCode: '61034200',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 22,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-007',
        colorName: 'Earthy Beige',
        colorHex: '#d8ccb8',
        sizes: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 11 },
          { size: 'L', stock: 7 },
          { size: 'XL', stock: 5 }
        ],
        images: [
          { id: 'pl-img-7', url: 'https://www.powerlook.in/cdn/shop/files/7_3x_f7a35f71-6348-451e-9f9c-28906b1c4885.jpg?v=1788935826', type: 'image', alt: 'Beige Panelled Barrel Fit Trackpant', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-008',
    slug: 'natural-embroidery-linen-shirt',
    name: 'NATURAL EMBROIDERY LINEN SHIRT',
    tagline: '100% Breathable Cotton Linen with Minimalist Front Embroidery',
    category: 'tees',
    price: 1099,
    originalPrice: 1799,
    badge: 'LIMITED',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Resort-ready camp collar shirt made from an airy linen-cotton blend. Intricate tonal embroidery on the chest adds quiet luxury sophistication.',
    fit: 'REGULAR',
    gsm: 190,
    fabricDetails: ['Cotton Linen Weave', 'Camp open collar silhouette', 'Real mother-of-pearl buttons', 'Lightweight texture'],
    careInstructions: ['Cold wash gentle', 'Warm steam iron'],
    modelInfo: {
      height: "5'11\" (180 cm)",
      wearingSize: 'M'
    },
    myBillBookMeta: {
      itemId: 'PL-SHIRT-008',
      hsnCode: '62052000',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 45,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-008',
        colorName: 'Natural Ecru',
        colorHex: '#f1ede4',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 9 },
          { size: 'L', stock: 8 },
          { size: 'XL', stock: 1 }
        ],
        images: [
          { id: 'pl-img-8', url: 'https://www.powerlook.in/cdn/shop/files/1497220.jpg?v=1779534340', type: 'image', alt: 'Natural Embroidery Linen Shirt', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-009',
    slug: 'cream-knit-structured-vest',
    name: 'CREAM KNIT STRUCTURED VEST',
    tagline: '100% Cotton Ribbed Knit Sleeveless Top for Layering',
    category: 'tees',
    price: 899,
    originalPrice: 1399,
    badge: 'HOT',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Thick cable-ribbed knit vest designed for summer layering over tees or worn standalone with baggy denim. Boxy cropped aesthetic.',
    fit: 'OVERSIZED',
    gsm: 320,
    fabricDetails: ['100% Heavy Cotton Knit', 'Architectural deep armholes', 'Wide ribbed hem and neck band'],
    careInstructions: ['Hand wash cold or gentle cycle', 'Flat dry only'],
    modelInfo: {
      height: "6'0\" (183 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-VEST-009',
      hsnCode: '61091000',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 36,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-009',
        colorName: 'Chalk Cream',
        colorHex: '#f5f2eb',
        sizes: [
          { size: 'S', stock: 4 },
          { size: 'M', stock: 10 },
          { size: 'L', stock: 6 },
          { size: 'XL', stock: 2 }
        ],
        images: [
          { id: 'pl-img-9', url: 'https://www.powerlook.in/cdn/shop/files/2_79136e3d-4c68-4174-bc19-67bb3cc66eb0.jpg?v=1782215844', type: 'image', alt: 'Cream Knit Structured Vest', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-010',
    slug: 'charcoal-black-washed-denim-overshirt',
    name: 'CHARCOAL BLACK WASHED DENIM SHIRT',
    tagline: '12 oz Acid Washed Rigid Cotton Denim with Utility Twin Flap Pockets',
    category: 'jackets',
    price: 1299,
    originalPrice: 1999,
    badge: 'BEST SELLER',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Heavyweight washed denim shirt-jacket hybrid. Features raw faded seams, heavy custom Mafia buttons, and boxy drop-shoulder cut.',
    fit: 'OVERSIZED',
    gsm: 400,
    fabricDetails: ['100% Rigid Denim Cotton', 'Acid vintage wash', 'Dual chest cargo pockets', 'Heavy-gauge contrast topstitch'],
    careInstructions: ['Wash inside out cold', 'Line dry in shade'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-SHIRT-010',
      hsnCode: '62052000',
      taxRatePercentage: 12
    },
    rating: 5.0,
    reviewCount: 58,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-010',
        colorName: 'Acid Washed Charcoal',
        colorHex: '#2b2b2b',
        sizes: [
          { size: 'S', stock: 3 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 9 },
          { size: 'XL', stock: 4 }
        ],
        images: [
          { id: 'pl-img-10', url: 'https://www.powerlook.in/cdn/shop/files/1529021.jpg?v=1782969430', type: 'image', alt: 'Charcoal Black Washed Denim Shirt', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-011',
    slug: 'sage-graphic-varsity-t-shirt',
    name: 'SAGE GRAPHIC VARSITY T-SHIRT',
    tagline: '280 GSM Heavy French Terry with Ivy-League Street Graphics',
    category: 'tees',
    price: 1199,
    originalPrice: 1699,
    badge: 'NEW',
    dropName: 'AUTUMN / WINTER EDITION',
    description: 'Cool sage green oversized tee engineered with cracked vintage varsity typography across the chest. Built for high-heat urban comfort.',
    fit: 'OVERSIZED',
    gsm: 280,
    fabricDetails: ['100% Heavy Combed Cotton', 'Bio-washed for ultra-soft hand feel', 'Crack-resistant puff ink'],
    careInstructions: ['Iron inside out', 'Machine wash cold'],
    modelInfo: {
      height: "6'0\" (183 cm)",
      wearingSize: 'L'
    },
    myBillBookMeta: {
      itemId: 'PL-TEE-011',
      hsnCode: '61091000',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 33,
    isFeatured: true,
    variants: [
      {
        id: 'var-pl-011',
        colorName: 'Muted Sage Green',
        colorHex: '#849382',
        sizes: [
          { size: 'S', stock: 6 },
          { size: 'M', stock: 14 },
          { size: 'L', stock: 5 },
          { size: 'XL', stock: 2 }
        ],
        images: [
          { id: 'pl-img-11', url: 'https://www.powerlook.in/cdn/shop/files/1_5e7b2125-f589-427a-bb51-b884a594d154.jpg?v=1782216345', type: 'image', alt: 'Sage Graphic Varsity T-Shirt', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'pl-012',
    slug: 'dark-grey-straight-fit-denim-jeans',
    name: 'DARK GREY STRAIGHT FIT DENIM JEANS',
    tagline: '13.5 oz Raw Ring-Spun Cotton with Whiskered Vintage Finish',
    category: 'denim',
    price: 1399,
    originalPrice: 2199,
    badge: 'BEST SELLER',
    dropName: 'DROP 08 — RAW UNIVERSE',
    description: 'Essential straight relaxed denim that pairs seamlessly with any oversized tee or heavyweight hoodie. Clean 5-pocket setup with antiqued silver rivets.',
    fit: 'BAGGY',
    gsm: 420,
    fabricDetails: ['100% Ring-Spun Cotton', 'Medium-rise straight leg cut', 'Antiqued nickel hardware', 'Reinforced waistband loops'],
    careInstructions: ['Machine wash cold inside out', 'Line dry in shade'],
    modelInfo: {
      height: "6'1\" (185 cm)",
      wearingSize: '32'
    },
    myBillBookMeta: {
      itemId: 'PL-JEAN-012',
      hsnCode: '62034200',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 41,
    isFeatured: true,
    storeWorld: 'clothing',
    variants: [
      {
        id: 'var-pl-012',
        colorName: 'Washed Dark Grey',
        colorHex: '#3a3a3a',
        sizes: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 12 },
          { size: 'L', stock: 9 },
          { size: 'XL', stock: 3 }
        ],
        images: [
          { id: 'pl-img-12', url: 'https://www.powerlook.in/cdn/shop/files/2_cc639dba-8956-40b0-a26a-95b5099aff1b.jpg?v=1786427043', type: 'image', alt: 'Dark Grey Straight Fit Denim Jeans', view: 'hero' }
        ]
      }
    ]
  },
  // ==========================================
  // SHOES MAFIA CATALOG (Kapda Mafia Footwear Collection)
  // ==========================================
  {
    id: 'bb-114',
    slug: 'km-shoes-1239',
    name: '1239',
    tagline: 'KAPDA MAFIA SHOES / Cushion Foam High-Street Sneaker',
    category: 'sport-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'SPORT SHOES',
    price: 499,
    originalPrice: 1299,
    badge: 'NEW',
    dropName: 'DROP 01 — RUNNERS',
    description: 'Ultra-cushioned sporty silhouette with responsive sole engineering and dynamic breathable mesh upper. Designed for high agility and daily streetwear wearability.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Breathable Engineered Mesh', 'Anti-slip rubber outsole', 'Cushion shock-absorber mid-layer'],
    careInstructions: ['Wipe clean with a damp cloth', 'Do not machine wash', 'Air dry only'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-114',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 38,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-114',
        colorName: 'Slate White',
        colorHex: '#e5e7eb',
        sizes: [
          { size: '7', stock: 27 },
          { size: '8', stock: 30 },
          { size: '9', stock: 28 },
          { size: '10', stock: 27 }
        ],
        images: [
          { id: 'bb-img-114', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875918_8060_img-7.jpeg', type: 'image', alt: '1239 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-113',
    slug: 'km-shoes-1238',
    name: '1238',
    tagline: 'KAPDA MAFIA SHOES / Performance Street Sneaker',
    category: 'sneaker-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'Sneaker Shoes',
    price: 499,
    originalPrice: 1399,
    badge: 'NEW',
    dropName: 'DROP 01 — STREET SILHOUETTES',
    description: 'Modern streamlined sneaker featuring structured heel counters, reinforced lace eyelets, and all-day comfort memory bed.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Synthetic Nubuck & Mesh', 'Molded EVA Outsole', 'Ergonomic insole'],
    careInstructions: ['Spot clean with sneaker brush', 'Do not soak in water'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-113',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-113',
        colorName: 'Core Black / Ice Grey',
        colorHex: '#1f2937',
        sizes: [
          { size: '7', stock: 24 },
          { size: '8', stock: 26 },
          { size: '9', stock: 29 },
          { size: '10', stock: 30 }
        ],
        images: [
          { id: 'bb-img-113', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875803_1634_img-6.jpeg', type: 'image', alt: '1238 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-112',
    slug: 'km-shoes-1237',
    name: '1237',
    tagline: 'KAPDA MAFIA SHOES / Urban Low-Profile Athletic Shoe',
    category: 'sport-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'SPORT SHOES',
    price: 499,
    originalPrice: 1199,
    badge: 'BEST SELLER',
    dropName: 'DROP 01 — RUNNERS',
    description: 'Minimalist low-profile sneaker with responsive shock absorption. Fits seamlessly with baggy cargos and selvedge denim.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Breathable Woven Knit', 'Lightweight Phylon Sole', 'Textured grip traction'],
    careInstructions: ['Gentle surface wipe', 'Keep away from direct heat'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-112',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.7,
    reviewCount: 29,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-112',
        colorName: 'Charcoal Grey',
        colorHex: '#374151',
        sizes: [
          { size: '6', stock: 5 },
          { size: '7', stock: 4 },
          { size: '9', stock: 4 },
          { size: '10', stock: 5 }
        ],
        images: [
          { id: 'bb-img-112', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875655_5795_img-5.jpeg', type: 'image', alt: '1237 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-110',
    slug: 'km-shoes-1235',
    name: '1235',
    tagline: 'KAPDA MAFIA SHOES / High-Grip Speed Runner',
    category: 'sport-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'SPORT SHOES',
    price: 499,
    originalPrice: 1299,
    badge: 'NEW',
    dropName: 'DROP 01 — RUNNERS',
    description: 'Built for speed and bold aesthetic lines. Features geometric sole blocks and reinforced lateral stability.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Honeycomb Air-Mesh', 'Flexible TPU cage', 'High-wear rubber patches'],
    careInstructions: ['Dry brush dirt', 'Wipe with damp sponge'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-110',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 31,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-110',
        colorName: 'Phantom Black',
        colorHex: '#111827',
        sizes: [
          { size: '7', stock: 27 },
          { size: '8', stock: 24 },
          { size: '9', stock: 30 },
          { size: '10', stock: 27 }
        ],
        images: [
          { id: 'bb-img-110', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875334_7713_img-3.jpeg', type: 'image', alt: '1235 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-109',
    slug: 'km-shoes-1234',
    name: '1234',
    tagline: 'KAPDA MAFIA SHOES / Chunky Sole Streetwear Sneaker',
    category: 'sneaker-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'Sneaker Shoes',
    price: 499,
    originalPrice: 1499,
    badge: 'HOT',
    dropName: 'DROP 01 — STREET SILHOUETTES',
    description: 'Sculpted chunky sole sneaker crafted for oversized styling. Offers incredible height and proportional balance to wide-leg trousers.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Multi-panel synthetic leather', 'Deep-tread chunky rubber sole', 'Padded tongue & collar'],
    careInstructions: ['Clean with shoe shampoo', 'Store in dry place'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-109',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.9,
    reviewCount: 54,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-109',
        colorName: 'Triple White / Cream',
        colorHex: '#f3f4f6',
        sizes: [
          { size: '7', stock: 10 },
          { size: '8', stock: 27 },
          { size: '9', stock: 27 },
          { size: '10', stock: 28 }
        ],
        images: [
          { id: 'bb-img-109', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788875152_img-2.jpeg', type: 'image', alt: '1234 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-108',
    slug: 'km-shoes-10021',
    name: '10021',
    tagline: 'KAPDA MAFIA SHOES / Lightweight Everyday Trainer',
    category: 'sport-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'SPORT SHOES',
    price: 499,
    originalPrice: 1249,
    badge: 'BEST SELLER',
    dropName: 'DROP 01 — RUNNERS',
    description: 'Featherlight construction crafted for effortless everyday strides. Soft lining prevents friction and blistering.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Ultra-flex knit', 'Shock-absorbing foam footbed', 'Non-marking tread'],
    careInstructions: ['Wipe with microfiber cloth', 'Air dry'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-108',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 4.8,
    reviewCount: 46,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-108',
        colorName: 'Cobalt Grey',
        colorHex: '#4b5563',
        sizes: [
          { size: '6', stock: 26 },
          { size: '7', stock: 19 },
          { size: '8', stock: 8 },
          { size: '9', stock: 16 }
        ],
        images: [
          { id: 'bb-img-108', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788874622_1415_img-1.jpeg', type: 'image', alt: '10021 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  },
  {
    id: 'bb-107',
    slug: 'km-shoes-24',
    name: '24',
    tagline: 'KAPDA MAFIA SHOES / Luxury Court High-Top Sneaker',
    category: 'sneaker-shoes',
    storeWorld: 'shoes',
    shoeCategory: 'Sneaker Shoes',
    price: 799,
    originalPrice: 1999,
    badge: 'LIMITED',
    dropName: 'DROP 01 — COURT EDITION',
    description: 'Premium statement court sneaker with contrast overlays and iconic vintage basketball heritage lines.',
    fit: 'STANDARD FIT',
    fabricDetails: ['Full-grain micro synthetic leather', 'Reinforced stitched cupsole', 'Vintage rubber outersole'],
    careInstructions: ['Leather lotion or sneaker foam wipe', 'Store with shoe trees'],
    myBillBookMeta: {
      itemId: 'KM-SHOE-107',
      hsnCode: '64041190',
      taxRatePercentage: 12
    },
    rating: 5.0,
    reviewCount: 61,
    isFeatured: true,
    variants: [
      {
        id: 'var-bb-107',
        colorName: 'Royal Black / Varsity White',
        colorHex: '#0f172a',
        sizes: [
          { size: '6', stock: 5 },
          { size: '7', stock: 5 },
          { size: '8', stock: 4 },
          { size: '9', stock: 5 },
          { size: '10', stock: 4 }
        ],
        images: [
          { id: 'bb-img-107', url: 'https://bunnyboss.in/secure-admin/uploads/item-master/1788695961_IMG_2627.PNG', type: 'image', alt: '24 Kapda Mafia Shoes', view: 'hero' }
        ]
      }
    ]
  }
];

export const MOCK_LOOKBOOKS: Lookbook[] = [
  {
    id: 'lb-01',
    code: 'LOOK 01',
    title: 'MIDNIGHT EDITORIAL UNIFORM',
    subtitle: 'BARREL FIT & MONOCHROME STRIPES',
    heroImage: 'https://www.powerlook.in/cdn/shop/files/3_3x_af828ed9-dc39-4c82-b83c-548de5ef1cdd.jpg?v=1787636605',
    description: 'Dark Blue Barrel Fit Jeans paired with the Black & White Striped boxy tee. Built for high impact street movement.',
    productIds: ['pl-001', 'pl-002']
  },
  {
    id: 'lb-02',
    code: 'LOOK 02',
    title: 'MONOLITH REBEL',
    subtitle: 'ACID DENIM & PANELED FLEECE',
    heroImage: 'https://www.powerlook.in/cdn/shop/files/1529021.jpg?v=1782969430',
    description: 'Charcoal Black Washed Denim Shirt styled over Black Paneled Baggy Trackpants. Heavy drape meets raw luxury.',
    productIds: ['pl-010', 'pl-005']
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-101',
    productId: 'pl-001',
    authorName: 'Aarav M.',
    rating: 5,
    date: '2026-08-04',
    title: 'Insane fit. The barrel curve is exactly as shown.',
    comment: 'The quality of the denim is heavy and the silhouette stacks naturally over my chunky sneakers. Powerlook Gen-Z collection hit the mark 100%.',
    verifiedPurchase: true,
    userFitRating: 'True to size',
    userHeightWeight: "6'1\" / 78 kg",
    purchasedSize: 'L'
  },
  {
    id: 'rev-102',
    productId: 'pl-005',
    authorName: 'Karan V.',
    rating: 5,
    date: '2026-08-01',
    title: 'Best baggy trackpants in India right now.',
    comment: 'The side panelling gives it structure so it does not look like a sloppy sweatpant. Worn it 5 times already.',
    verifiedPurchase: true,
    userFitRating: 'Runs large',
    userHeightWeight: "5'10\" / 72 kg",
    purchasedSize: 'M'
  }
];
