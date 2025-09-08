import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Package } from "lucide-react";
import { productCategories, Product } from "../../data/products";
import { resolveProductImage } from "../../utils/assetResolver";

const ProductPreview: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get featured products from all categories
  const featuredProducts: Product[] = productCategories
    .flatMap(
      (category) => category.products.slice(0, 2) // Take first 2 products from each category
    )
    .slice(0, 8); // Limit to 8 total featured products

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3)
    );
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(featuredProducts.length / 3) - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * 3;
    return featuredProducts.slice(startIndex, startIndex + 3);
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our premium selection of agricultural exports, carefully
            curated to meet the highest international standards
          </p>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center justify-center group"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentProducts().map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-emerald-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              )
            )}
          </div>
        </div>

        {/* View All Products CTA */}
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>View All Products</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = product.image
    ? resolveProductImage(
        product.image,
        "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      )
    : "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>

        {/* Subcategory Badge */}
        {product.subCategory && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {product.subCategory}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {product.description}
        </p>

        {/* Key Features Preview */}
        {product.keyFeatures && (
          <div className="mb-4">
            <ul className="space-y-1">
              {product.keyFeatures.slice(0, 2).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <Star className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Variants Preview */}
        {product.variants && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {product.variants.slice(0, 3).map((variant, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium"
                >
                  {variant.type}
                </span>
              ))}
              {product.variants.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  +{product.variants.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 mt-auto pt-4">
          <Link
            to={`/products/${product.category
              .toLowerCase()
              .replace(/\s+/g, "-")}/${product.id}`}
            className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 text-sm font-medium text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            View Details
          </Link>
          <Link
            to="/contact"
            className="flex-1 border-2 border-emerald-600 text-emerald-600 py-3 px-4 rounded-xl hover:bg-emerald-50 hover:border-emerald-700 transition-all duration-200 text-sm font-medium text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
