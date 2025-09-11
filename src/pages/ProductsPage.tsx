import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Grid, List, ArrowRight, Package } from "lucide-react";
import {
  productCategories,
  searchProducts,
  getProductsByCategory,
  Product,
} from "../data/products";
import { resolveProductImage } from "../utils/assetResolver";

const ProductsPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryId || ""
  );

  // Update selected category when categoryId changes
  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    let products: Product[] = [];

    if (searchQuery) {
      products = searchProducts(searchQuery);
    } else if (selectedCategory) {
      products = getProductsByCategory(selectedCategory);
    } else if (categoryId) {
      // Handle direct category navigation from URL
      products = getProductsByCategory(categoryId);
    } else {
      products = productCategories.flatMap((cat) => cat.products);
    }

    return products;
  }, [searchQuery, selectedCategory, categoryId]);

  // Group products by category for search results
  const groupedProducts = useMemo(() => {
    if (!searchQuery) return null;

    const grouped: { [key: string]: Product[] } = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    return grouped;
  }, [filteredProducts, searchQuery]);

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">
            Our Product <span className="text-amber-400">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Discover India's finest agricultural exports, from premium rice
            varieties to specialty products
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search products, categories, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg placeholder-gray-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-80">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 text-lg appearance-none bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-white text-emerald-600 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-white text-emerald-600 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-300 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              {searchQuery ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products for "{searchQuery}"
                </>
              ) : selectedCategory ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products in{" "}
                  {
                    productCategories.find((c) => c.id === selectedCategory)
                      ?.name
                  }
                </>
              ) : (
                <>
                  Showing all{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </>
              )}
            </p>
          </div>

          {/* Search Results - Grouped by Category */}
          {searchQuery && groupedProducts && (
            <div className="space-y-8">
              {Object.entries(groupedProducts).map(
                ([categoryName, products]) => (
                  <div
                    key={categoryName}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {categoryName}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          viewMode="grid"
                        />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Regular Product Display */}
          {!searchQuery && (
            <>
              {/* Category-based Display */}
              {selectedCategory ? (
                <div className="space-y-8">
                  {productCategories
                    .filter((cat) => cat.id === selectedCategory)
                    .map((category) => (
                      <div
                        key={category.id}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center space-x-3 mb-6">
                          <span className="text-3xl">{category.icon}</span>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                              {category.name}
                            </h2>
                            <p className="text-gray-600">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        {/* Subcategories */}
                        {category.subCategories && (
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                              Categories
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(category.subCategories).map(
                                ([subCatName, items]) => (
                                  <div
                                    key={subCatName}
                                    className="bg-gray-50 rounded-xl p-4"
                                  >
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      {subCatName}
                                    </h4>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                      {items.slice(0, 3).map((item, index) => (
                                        <li key={index}>{item}</li>
                                      ))}
                                      {items.length > 3 && (
                                        <li className="text-emerald-600 font-medium">
                                          +{items.length - 3} more
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Products */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.products.map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              viewMode={viewMode}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                /* All Categories Display */
                <div className="space-y-8">
                  {productCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white rounded-2xl shadow-lg p-6"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{category.icon}</span>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                              {category.name}
                            </h2>
                            <p className="text-gray-600">
                              {category.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleCategoryExpansion(category.id)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          {expandedCategories.has(category.id)
                            ? "Show Less"
                            : "Show More"}
                        </button>
                      </div>

                      {/* Products Grid */}
                      <div
                        className={`grid gap-6 transition-all duration-300 ${
                          expandedCategories.has(category.id)
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        }`}
                      >
                        {category.products
                          .slice(
                            0,
                            expandedCategories.has(category.id) ? undefined : 6
                          )
                          .map((product) => (
                            <ProductCard
                              key={product.id}
                              product={product}
                              viewMode={viewMode}
                            />
                          ))}
                      </div>

                      {category.products.length > 6 && (
                        <div className="mt-6 text-center">
                          <Link
                            to={`/products/${category.id}`}
                            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            <span>
                              View all {category.products.length} products
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={clearFilters}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const imageUrl = product.image
    ? resolveProductImage(
        product.image,
        "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      )
    : "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="flex flex-col">
          {/* Image Section */}
          <div className="w-full relative overflow-hidden">
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";
                }}
              />
            </div>
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content Section - Below Image */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {product.keyFeatures && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-base flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  Key Features
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.keyFeatures.slice(0, 4).map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variants */}
            {product.variants && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-base flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Available Variants
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                    >
                      {variant.type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to={`/products/${product.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}/${product.id}`}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Details
              </Link>
              <Link
                to="/contact"
                className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl hover:bg-emerald-50 hover:border-emerald-700 transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Image Container */}
      <div className="h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
            {product.category}
          </span>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Key Features Preview */}
        {product.keyFeatures && (
          <div className="mb-4">
            <ul className="space-y-2">
              {product.keyFeatures.slice(0, 2).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-xs text-gray-600"
                >
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4">
          <div className="flex flex-col space-y-3">
            <Link
              to={`/products/${product.category
                .toLowerCase()
                .replace(/\s+/g, "-")}/${product.id}`}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-4 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 text-sm font-semibold text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              View Details
            </Link>
            <Link
              to="/contact"
              className="w-full border-2 border-emerald-600 text-emerald-600 py-3 px-4 rounded-2xl hover:bg-emerald-50 hover:border-emerald-700 transition-all duration-300 text-sm font-semibold text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
