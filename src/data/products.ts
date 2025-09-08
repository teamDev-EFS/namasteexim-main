import { resolveProductImage } from "../utils/assetResolver";

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
      "Non-Basmati Rice Varieties": [
        "Parmal Golden Sella - High yield, consistent quality, parboiled",
        "Short-Grain Options (Sushi, Sticky Rice Dishes)",
        "Medium-Grain Options (Asian & European Cuisines)",
        "Specialty Varieties (Unique Market Demands)",
      ],
    },
    products: [
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
        id: "basmati-1121",
        name: "Basmati Rice 1121",
        category: "Rice Portfolio",
        subCategory: "Perfumed Rice",
        description:
          "Extra long grain premium basmati rice with exceptional aroma",
        image: "basmati-1121",
        keyFeatures: [
          "Extra Long Grain",
          "Exceptional Aroma",
          "Premium Export Quality",
          "Perfect for Biryanis",
        ],
        packaging: ["25kg bags", "50kg bags", "Bulk containers"],
        shelfLife: "24 months",
      },
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
      {
        id: "parmal-golden-sella",
        name: "Parmal Golden Sella",
        category: "Rice Portfolio",
        subCategory: "Non-Basmati Rice Varieties",
        description: "High yield, consistent quality, parboiled rice variety",
        image: "rice",
        keyFeatures: [
          "High Yield Variety",
          "Consistent Quality",
          "Parboiled Processing",
          "Excellent Cooking Properties",
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
        id: "eggs",
        name: "Fresh Eggs",
        category: "Specialty Products",
        description:
          "Sourced from certified poultry farms, rich in protein and nutrients, suitable for households, food services, and health markets",
        image: "eggs",
        variants: [
          {
            type: "White Eggs",
            description: "Clean, uniform shells with mild flavor",
          },
          {
            type: "Brown Eggs",
            description: "Slightly richer taste, preferred in organic markets",
          },
          {
            type: "Quail Eggs",
            description: "Small, nutrient-dense, exotic appeal",
          },
        ],
        keyFeatures: [
          "High in Protein, Vitamin D, B12 & Selenium",
          "Low in Calories & Carbs",
          "Sourced from Antibiotic-Free & Hormone-Free Farms",
          "Available in Graded Sizes (S, M, L, XL)",
          "Washed, UV-Sanitized & Packed for Extended Shelf Life",
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
