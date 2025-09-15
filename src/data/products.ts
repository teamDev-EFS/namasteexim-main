// Product data definitions

export interface ProductVariant {
  type: string;
  description: string;
}

export interface ProductHighlights {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  image?: string;
  variants?: ProductVariant[];
  highlights?: string[] | ProductHighlights;
  keyFeatures?: string[];
  keyBenefits?: string[];
  targetUse?: string[];
  packaging?: string[];
  shelfLife?: string | { [key: string]: string };
  available?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  products: Product[];
  subCategories?: {
    [key: string]: string[];
  };
}

export const productCategories: ProductCategory[] = [
  {
    id: "rice-portfolio",
    name: "Rice Portfolio",
    icon: "🌾",
    description:
      "Premium rice varieties from India's finest agricultural regions",
    subCategories: {
      "Basmati Rice Varieties": [
        "1121 Basmati Rice (Steam / Sella / Raw)",
        "1509 Basmati Rice (Steam / Sella / Raw)",
        "1401 Basmati Rice (Steam / Sella / Raw)",
        "Traditional Basmati Rice (Aged, Premium Quality)",
        "Pusa Basmati Rice (Steam / Sella / Raw)",
      ],
      "Non-Basmati Rice Varieties": [
        "Parboiled Rice (IR 64, 100% Broken / 5% Broken)",
        "Chinnor Rice – Premium Short Grain",
        "Sona Masoori Rice",
        "Kolam Rice",
      ],
      "Perfumed Rice": [
        "ST24/ST25 Rice (World Best Rice 2019)",
        "Jasmine Rice ST20 (Same as Basmati Rice)",
        "ST21 Rice",
        "Hom Mali Rice",
        "Fragrant Rice / Perfumed Rice",
        "KDM Rice",
      ],
      "White Rice": [
        "Long Grain White Rice (5% / 15% / 25% / 50% Broken)",
        "Rice 100% Broken Long Grain",
        "Parboiled Rice 5% Broken",
      ],
      "Glutinous Rice": ["Long An Glutinous Rice", "An Giang Glutinous Rice"],
    },
    products: [
      // Basmati Rice Varieties
      {
        id: "basmati-1121",
        name: "1121 Basmati Rice",
        category: "Rice Portfolio",
        subCategory: "Basmati Rice Varieties",
        description:
          "Extra long grain premium basmati rice with exceptional aroma, available in Steam, Sella, and Raw varieties",
        image: "1121 Basmati Rice",
        variants: [
          {
            type: "Steam",
            description: "Steamed for enhanced texture and cooking properties",
          },
          {
            type: "Sella",
            description: "Parboiled golden variety with nutty flavor",
          },
          { type: "Raw", description: "Natural unprocessed premium quality" },
        ],
        keyFeatures: [
          "Extra Long Grain (8.5mm+)",
          "Exceptional Aroma & Flavor",
          "Premium Export Quality",
          "Perfect for Biryanis & Pulao",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "basmati-1509",
        name: "1509 Basmati Rice",
        category: "Rice Portfolio",
        subCategory: "Basmati Rice Varieties",
        description:
          "High-yielding basmati variety with excellent cooking properties, available in Steam, Sella, and Raw varieties",
        image: "1509 Basmati Rice",
        variants: [
          {
            type: "Steam",
            description: "Steamed for enhanced texture and cooking properties",
          },
          {
            type: "Sella",
            description: "Parboiled golden variety with nutty flavor",
          },
          { type: "Raw", description: "Natural unprocessed premium quality" },
        ],
        keyFeatures: [
          "High Yield Variety",
          "Long Grain Structure",
          "Excellent Cooking Properties",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "basmati-1401",
        name: "1401 Basmati Rice",
        category: "Rice Portfolio",
        subCategory: "Basmati Rice Varieties",
        description:
          "Premium basmati variety with superior aroma and cooking characteristics, available in Steam, Sella, and Raw varieties",
        image: "1401 Basmati Rice",
        variants: [
          {
            type: "Steam",
            description: "Steamed for enhanced texture and cooking properties",
          },
          {
            type: "Sella",
            description: "Parboiled golden variety with nutty flavor",
          },
          { type: "Raw", description: "Natural unprocessed premium quality" },
        ],
        keyFeatures: [
          "Superior Aroma",
          "Long Grain Structure",
          "Premium Quality",
          "Excellent Cooking Properties",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "traditional-basmati",
        name: "Traditional Basmati Rice",
        category: "Rice Portfolio",
        subCategory: "Basmati Rice Varieties",
        description:
          "Aged, premium quality traditional basmati rice with authentic aroma and superior cooking properties",
        image: "Traditional Basmati Rice Premium",
        keyFeatures: [
          "Aged for Enhanced Aroma",
          "Traditional Quality",
          "Premium Export Grade",
          "Authentic Basmati Characteristics",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "pusa-basmati",
        name: "Pusa Basmati Rice",
        category: "Rice Portfolio",
        subCategory: "Basmati Rice Varieties",
        description:
          "High-yielding Pusa basmati variety with excellent grain quality, available in Steam, Sella, and Raw varieties",
        image: "Pusa Basmati Rice",
        variants: [
          {
            type: "Steam",
            description: "Steamed for enhanced texture and cooking properties",
          },
          {
            type: "Sella",
            description: "Parboiled golden variety with nutty flavor",
          },
          { type: "Raw", description: "Natural unprocessed premium quality" },
        ],
        keyFeatures: [
          "High Yield Variety",
          "Long Grain Structure",
          "Excellent Cooking Properties",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      // Non-Basmati Rice Varieties
      {
        id: "parboiled-rice-ir64",
        name: "Parboiled Rice IR 64",
        category: "Rice Portfolio",
        subCategory: "Non-Basmati Rice Varieties",
        description:
          "High-quality parboiled rice available in 100% Broken and 5% Broken varieties",
        image: "Parboiled Rice",
        variants: [
          {
            type: "100% Broken",
            description: "Fully broken grains for specific applications",
          },
          {
            type: "5% Broken",
            description: "Premium grade with minimal broken grains",
          },
        ],
        keyFeatures: [
          "Parboiled Processing",
          "High Nutritional Value",
          "Excellent Cooking Properties",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "chinnor-rice",
        name: "Chinnor Rice – Premium Short Grain",
        category: "Rice Portfolio",
        subCategory: "Non-Basmati Rice Varieties",
        description:
          "Premium short grain rice with excellent cooking properties and mild aroma",
        image: "Chinnor Rice - Premium Short Grain",
        keyFeatures: [
          "Premium Short Grain",
          "Mild Aroma",
          "Excellent Cooking Properties",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "sona-masoori",
        name: "Sona Masoori Rice",
        category: "Rice Portfolio",
        subCategory: "Non-Basmati Rice Varieties",
        description:
          "Popular medium grain rice variety known for its excellent cooking properties and mild flavor",
        image: "Sona Masoori Rice",
        keyFeatures: [
          "Medium Grain Structure",
          "Mild Flavor",
          "Excellent Cooking Properties",
          "Popular Choice",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "kolam-rice",
        name: "Kolam Rice",
        category: "Rice Portfolio",
        subCategory: "Non-Basmati Rice Varieties",
        description:
          "Premium short grain rice variety with excellent texture and cooking properties",
        image: "Kolam Rice",
        keyFeatures: [
          "Short Grain Variety",
          "Excellent Texture",
          "Good Cooking Properties",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      // Perfumed Rice
      {
        id: "st24-st25-rice",
        name: "ST24/ST25 Rice (World Best Rice 2019)",
        category: "Rice Portfolio",
        subCategory: "Perfumed Rice",
        description:
          "World's best rice variety, known for exceptional aroma and quality",
        image: "rice",
        keyFeatures: [
          "World's Best Rice 2019 Award Winner",
          "Exceptional Aroma & Flavor",
          "Premium Export Quality",
          "Consistent Grain Size",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "jasmine-rice-st20",
        name: "Jasmine Rice ST20 (Same as Basmati Rice)",
        category: "Rice Portfolio",
        subCategory: "Perfumed Rice",
        description: "Premium jasmine rice with basmati-like qualities",
        image: "jasmine-rice",
        keyFeatures: [
          "Basmati-like Aroma",
          "Long Grain Structure",
          "Premium Quality",
          "Perfect for Asian Cuisine",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "thai-rice",
        name: "Thai Jasmine Rice",
        category: "Rice Portfolio",
        subCategory: "Perfumed Rice",
        description: "Fragrant long grain rice with natural jasmine aroma",
        image: "thai rice",
        keyFeatures: [
          "Natural Jasmine Aroma",
          "Long Grain Structure",
          "Perfect for Asian Cuisine",
          "Soft & Sticky Texture",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      // White Rice
      {
        id: "white-rice",
        name: "Premium White Rice",
        category: "Rice Portfolio",
        subCategory: "White Rice",
        description:
          "High-quality long grain white rice with excellent cooking properties",
        image: "white-rice",
        keyFeatures: [
          "Long Grain Structure",
          "Excellent Cooking Properties",
          "Versatile for All Cuisines",
          "Consistent Quality",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
    ],
  },
  {
    id: "jaggery-sweeteners",
    name: "Jaggery & Sweeteners",
    icon: "🍯",
    description: "Pure, wholesome & traditionally crafted natural sweeteners",
    products: [
      {
        id: "jaggery-blocks",
        name: "Jaggery Blocks",
        category: "Jaggery & Sweeteners",
        description:
          "Solid chunks with a rich caramel flavor and golden-brown hue",
        image: "pure-jaggery",
        variants: [
          { type: "Small Blocks", description: "Perfect for individual use" },
          { type: "Large Blocks", description: "Ideal for bulk cooking" },
        ],
        keyFeatures: [
          "100% Natural & Chemical-Free",
          "Rich in Iron, Calcium, Magnesium & Antioxidants",
          "Supports Digestion & Boosts Immunity",
          "Low Glycemic Index - Suitable for Diabetics (in moderation)",
          "Sustainable & Eco-Friendly Production Practices",
        ],
        packaging: ["1kg blocks", "5kg blocks", "Bulk packaging"],
        shelfLife: "18 months",
      },
      {
        id: "jaggery-powder",
        name: "Jaggery Powder",
        category: "Jaggery & Sweeteners",
        description: "Finely ground for easy blending and measuring",
        image: "jaggery-powder",
        keyFeatures: [
          "100% Natural & Chemical-Free",
          "Rich in Iron, Calcium, Magnesium & Antioxidants",
          "Supports Digestion & Boosts Immunity",
          "Low Glycemic Index - Suitable for Diabetics (in moderation)",
          "Sustainable & Eco-Friendly Production Practices",
        ],
        packaging: ["500g pouches", "1kg pouches", "Bulk packaging"],
        shelfLife: "18 months",
      },
    ],
  },
  {
    id: "premium-products",
    name: "Premium Products",
    icon: "⭐",
    description:
      "High-quality premium agricultural products for discerning markets",
    products: [
      {
        id: "cashew-nuts-w180",
        name: "Cashew Nuts W180",
        category: "Premium Products",
        description: "Premium whole white kernels, export grade W180",
        image: "cashew-w180",
        variants: [
          {
            type: "W180",
            description: "Whole white kernels, premium export grades",
          },
          { type: "W210", description: "Slightly larger whole kernels" },
          { type: "W240", description: "Standard whole kernel size" },
        ],
        keyFeatures: [
          "High in Healthy Fats, Protein & Minerals",
          "Naturally Cholesterol-Free",
          "Creamy Texture & Mild Sweet Flavor",
          "Processed & Packed Under Hygienic Conditions",
          "Available in Raw, Roasted, and Seasoned Forms",
        ],
        packaging: ["1kg pouches", "5kg bags", "Bulk containers"],
        shelfLife: "12 months",
      },
      {
        id: "green-cardamom",
        name: "Green Cardamom",
        category: "Premium Products",
        description:
          "Premium-grade cardamom pods from India, prized for aroma, flavor, and health benefits",
        image: "green-cardamom",
        highlights: {
          "Distinctive Aroma": "Intense, sweet, aromatic flavor profile",
          "Health Benefits":
            "Rich in antioxidants, aids digestion, promotes oral health, anti-inflammatory",
          "Culinary Versatility":
            "Used in Indian, Middle Eastern, Nordic cuisines for curries, desserts, coffees, teas",
          "Premium Quality":
            "Carefully graded, air-sealed to preserve freshness and potency",
        },
        packaging: [
          "Air-sealed bags",
          "Bulk cartons",
          "Custom branding available",
        ],
        shelfLife: {
          "Whole Pods": "18 months",
          Ground: "12 months",
        },
      },
      {
        id: "fragrance-candles",
        name: "Fragrance Candles",
        category: "Premium Products",
        description:
          "Handcrafted candles infused with essential oils, designed for relaxation and luxury",
        image: "fragrance-candles",
        keyFeatures: [
          "Infused with Natural Essential Oils (Lavender, Rose, Sandalwood, Vanilla & more)",
          "Smoke-Free & Long-Lasting Burn",
          "Eco-Friendly Wax Options (Soy, Beeswax, Paraffin blends)",
          "Hand-Poured & Customizable Designs",
          "Mood-Enhancing & Stress-Relieving Aromas",
        ],
        variants: [
          {
            type: "Jar Candles",
            description: "Glass containers with long burn time",
          },
          { type: "Tea Lights", description: "Freestanding, classic design" },
          {
            type: "Decorative Candles",
            description: "Compact and richly fragrant",
          },
        ],
        packaging: ["Individual packaging", "Gift sets", "Bulk orders"],
        shelfLife: "36 months",
      },
    ],
  },
  {
    id: "grains-pulses",
    name: "Grains & Pulses",
    icon: "🌱",
    description:
      "Farm-fresh, nutritionally balanced, export-grade grains & pulses sourced across India",
    products: [
      {
        id: "wheat",
        name: "Premium Wheat",
        category: "Grains & Pulses",
        description: "High-quality wheat grains with excellent protein content",
        image: "wheat",
        keyFeatures: [
          "High Protein & Fiber Content",
          "Naturally Grown & Minimally Processed",
          "Ideal for Retail, Horeca, and Bulk Supply",
          "Available in consumer packs and bulk quantities",
        ],
        packaging: [
          "PP bags",
          "Jute sacks",
          "Retail pouches",
          "Custom labeling available",
        ],
        shelfLife: "24 months",
      },
      {
        id: "lentils",
        name: "Premium Lentils",
        category: "Grains & Pulses",
        description:
          "Nutritious lentils rich in protein and essential nutrients",
        image: "lentils",
        keyFeatures: [
          "High Protein & Fiber Content",
          "Naturally Grown & Minimally Processed",
          "Ideal for Retail, Horeca, and Bulk Supply",
          "Available in consumer packs and bulk quantities",
        ],
        packaging: [
          "PP bags",
          "Jute sacks",
          "Retail pouches",
          "Custom labeling available",
        ],
        shelfLife: "24 months",
      },
    ],
  },
  {
    id: "superfoods",
    name: "Superfoods",
    icon: "🌟",
    description:
      "Premium superfood-grade products, sustainably sourced and globally recognized for exceptional health benefits",
    products: [
      {
        id: "chia-seeds",
        name: "Chia Seeds",
        category: "Superfoods",
        description:
          "Premium superfood-grade chia seeds, sustainably sourced and globally recognized for their exceptional health benefits",
        image: "chia seeds",
        keyBenefits: [
          "High in Omega-3 & Fiber",
          "Excellent Source of Plant-Based Protein",
          "Supports Digestive Health & Weight Management",
          "Ideal for Smoothies, Baking & Health Foods",
        ],
        targetUse: [
          "Health food brands",
          "Bulk ingredient suppliers",
          "Wellness-focused retailers",
        ],
        packaging: [
          "Food-grade pouches",
          "Bulk sacks",
          "Custom branding available",
        ],
        shelfLife: "24 months",
      },
    ],
  },
  {
    id: "specialty-products",
    name: "Specialty Products",
    icon: "🎯",
    description:
      "Unique and specialized agricultural products for niche markets",
    products: [
      {
        id: "chinnor-rice",
        name: "Chinnor Rice",
        category: "Specialty Products",
        description: "Aromatic rice from Madhya Pradesh & Chhattisgarh",
        image: "rice",
        highlights: [
          "Naturally Aromatic & Soft-Grained",
          "Ideal for Traditional Dishes & Gourmet Cuisine",
          "Low Glycemic Index - Health Friendly",
          "Stone-Free, Uniform Grains, Hygienically Processed",
          "Available in Raw & Parboiled Form",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
      {
        id: "white-eggs",
        name: "White Eggs",
        category: "Specialty Products",
        description:
          "Premium white eggs sourced from certified poultry farms, rich in protein and nutrients",
        image: "White Eggs",
        keyFeatures: [
          "Clean, Uniform Shells",
          "Mild, Pleasant Flavor",
          "High in Protein, Vitamin D, B12 & Selenium",
          "Sourced from Antibiotic-Free & Hormone-Free Farms",
          "Available in Graded Sizes (S, M, L, XL)",
        ],
        packaging: ["30-egg trays", "60-egg trays", "Bulk packaging"],
        shelfLife: "28 days (refrigerated)",
      },
      {
        id: "brown-eggs",
        name: "Brown Eggs",
        category: "Specialty Products",
        description:
          "Premium brown eggs with slightly richer taste, preferred in organic and health markets",
        image: "Brown Eggs",
        keyFeatures: [
          "Richer Taste Profile",
          "Preferred in Organic Markets",
          "High in Protein, Vitamin D, B12 & Selenium",
          "Sourced from Antibiotic-Free & Hormone-Free Farms",
          "Available in Graded Sizes (S, M, L, XL)",
        ],
        packaging: ["30-egg trays", "60-egg trays", "Bulk packaging"],
        shelfLife: "28 days (refrigerated)",
      },
      {
        id: "black-meat-chicken-eggs",
        name: "Black Meat Chicken Eggs",
        category: "Specialty Products",
        description:
          "Premium eggs from black meat chicken breeds, known for superior nutritional value and rich flavor",
        image: "Black Meat Chicken Eggs",
        keyFeatures: [
          "Superior Nutritional Value",
          "Rich, Distinctive Flavor",
          "Higher Protein Content",
          "Sourced from Premium Black Meat Chicken Breeds",
          "Available in Graded Sizes (S, M, L, XL)",
        ],
        packaging: ["30-egg trays", "60-egg trays", "Bulk packaging"],
        shelfLife: "28 days (refrigerated)",
      },
      {
        id: "quail-eggs",
        name: "Quail Eggs",
        category: "Specialty Products",
        description:
          "Small, nutrient-dense quail eggs with exotic appeal and superior nutritional profile",
        image: "Quail Eggs",
        keyFeatures: [
          "Nutrient-Dense",
          "Exotic Appeal",
          "Higher Protein per Gram",
          "Rich in Vitamins & Minerals",
          "Perfect for Gourmet Applications",
        ],
        packaging: ["30-egg trays", "60-egg trays", "Bulk packaging"],
        shelfLife: "28 days (refrigerated)",
      },
    ],
  },
];

// Helper function to get all products
export const getAllProducts = (): Product[] => {
  return productCategories.flatMap((category) => category.products);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return getAllProducts().filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.subCategory &&
        product.subCategory.toLowerCase().includes(searchTerm))
  );
};

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = productCategories.find((cat) => cat.id === categoryId);
  return category ? category.products : [];
};

// Helper function to get product by ID
export const getProductById = (productId: string): Product | undefined => {
  return getAllProducts().find((product) => product.id === productId);
};
