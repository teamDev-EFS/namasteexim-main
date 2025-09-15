// Utility to resolve asset URLs from src/assets/images by basename
const importedImages = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,svg}",
  { eager: true, as: "url" }
) as Record<string, string>;

const imageBasenameToUrl = new Map<string, string>();

Object.entries(importedImages).forEach(([absolutePath, url]) => {
  const lastSegment = absolutePath.split("/").pop() || "";
  const base = lastSegment
    .replace(/\.(png|jpe?g|webp|svg)$/i, "")
    .toLowerCase();
  if (base) {
    imageBasenameToUrl.set(base, url);
  }
});

// Direct image name mappings for better accuracy
const directImageMappings: Record<string, string> = {
  rice: "rice.jpeg",
  "jasmine-rice": "jasmine-rice.jpg",
  "basmati-1121": "basmati-1121.jpg",
  "white-rice": "white-rice.jpg",
  "thai rice": "thai rice.webp",
  "pure-jaggery": "pure-jaggery.jpg",
  "jaggery-powder": "jaggery-powder.jpg",
  "cashew-w180": "cashew-w180.jpg",
  "cashew-w210": "cashew-w210.jpg",
  "green-cardamom": "green-cardamom.jpg",
  "black-pepper": "black-pepper.jpg",
  wheat: "wheat.jpg",
  lentils: "lentils.jpg",
  "fragrance-candles": "fragrance-candles.jpg",
  "chia seeds": "chia seeds.webp",
  "scented candles": "scented candles.webp",
  // New Rice Images
  "1121 Basmati Rice": "1121 Basmati Rice.jpg",
  "1509 Basmati Rice": "1509 Basmati Rice.jpg",
  "1401 Basmati Rice": "1401 Basmati Rice.jpg",
  "Traditional Basmati Rice Premium": "Traditional Basmati Rice Premium.jpg",
  "Pusa Basmati Rice": "Pusa Basmati Rice.jpg",
  "Parboiled Rice": "Parboiled Rice.jpg",
  "Chinnor Rice - Premium Short Grain":
    "Chinnor Rice - Premium Short Grain.jpg",
  "Sona Masoori Rice": "Sona Masoori Rice.jpg",
  "Kolam Rice": "Kolam Rice.jpg",
  // New Egg Images
  "White Eggs": "White Eggs.jpg",
  "Brown Eggs": "Brown Eggs.jpg",
  "Black Meat Chicken Eggs": "Black Meat Chicken Eggs.jpg",
  "Quail Eggs": "Quail Eggs.jpg",
};

// Category-specific fallback images with better quality
const categoryFallbacks: Record<string, string> = {
  rice: "https://images.pexels.com/photos/4110221/pexels-photo-4110221.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  jaggery:
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  cashew:
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  cardamom:
    "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  candles:
    "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  wheat:
    "https://images.pexels.com/photos/4110221/pexels-photo-4110221.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  lentils:
    "https://images.pexels.com/photos/4110221/pexels-photo-4110221.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  chia: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  eggs: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
  chinnor:
    "https://images.pexels.com/photos/4110221/pexels-photo-4110221.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
};

export function resolveProductImage(
  preferredBasename: string,
  fallbackUrl: string
): string {
  const normalized = preferredBasename.toLowerCase().replace(/\s+/g, "-");

  // First try direct mapping
  if (directImageMappings[preferredBasename]) {
    const mappedName = directImageMappings[preferredBasename];
    if (
      imageBasenameToUrl.has(mappedName.replace(/\.(png|jpe?g|webp|svg)$/i, ""))
    ) {
      return imageBasenameToUrl.get(
        mappedName.replace(/\.(png|jpe?g|webp|svg)$/i, "")
      )!;
    }
  }

  // Try exact match
  if (imageBasenameToUrl.has(normalized)) {
    return imageBasenameToUrl.get(normalized)!;
  }

  // Try with original spaces
  if (imageBasenameToUrl.has(preferredBasename.toLowerCase())) {
    return imageBasenameToUrl.get(preferredBasename.toLowerCase())!;
  }

  // Common naming variants
  const variants = [
    `${normalized}@2x`,
    `${normalized}@3x`,
    `${normalized}-image`,
    `${normalized}-photo`,
    preferredBasename.toLowerCase(),
  ];

  for (const variant of variants) {
    if (imageBasenameToUrl.has(variant)) {
      return imageBasenameToUrl.get(variant)!;
    }
  }

  // Try to find category-specific fallback
  for (const [category, fallback] of Object.entries(categoryFallbacks)) {
    if (
      normalized.includes(category) ||
      preferredBasename.toLowerCase().includes(category)
    ) {
      return fallback;
    }
  }

  return fallbackUrl;
}
