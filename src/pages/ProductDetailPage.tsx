import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Package,
  Clock,
  Truck,
  CheckCircle,
  Quote,
} from "lucide-react";
import { getProductById, productCategories } from "../data/products";
import { resolveProductImage } from "../utils/assetResolver";
import QuoteRequestModal from "../components/UI/QuoteRequestModal";

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState("1");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const product = getProductById(productId || "");
  const category = product
    ? productCategories.find(
        (cat) => cat.id === product.category.toLowerCase().replace(/\s+/g, "-")
      )
    : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/products"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.image
    ? resolveProductImage(
        product.image,
        "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
      )
    : "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop";

  const handleQuoteRequest = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <section className="pt-32 pb-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/products"
              className="hover:text-emerald-600 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <Link
              to={`/products/${product.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="hover:text-emerald-600 transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  {product.subCategory && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {product.subCategory}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              {product.keyFeatures && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Benefits */}
              {product.keyBenefits && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Benefits
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.keyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {product.highlights && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Highlights
                  </h3>
                  {Array.isArray(product.highlights) ? (
                    <ul className="space-y-2">
                      {product.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Star className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(product.highlights).map(
                        ([key, value]) => (
                          <div key={key} className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {key}
                            </h4>
                            <p className="text-gray-600 text-sm">{value}</p>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Variants */}
              {product.variants && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Available Variants
                  </h3>
                  <div className="space-y-3">
                    {product.variants.map((variant, index) => (
                      <div
                        key={index}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedVariant === variant.type
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedVariant(variant.type)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {variant.type}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {variant.description}
                            </p>
                          </div>
                          {selectedVariant === variant.type && (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Use */}
              {product.targetUse && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Target Use
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.targetUse.map((use, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Packaging & Shelf Life */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.packaging && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Package className="w-5 h-5 mr-2 text-emerald-500" />
                      Packaging Options
                    </h3>
                    <ul className="space-y-2">
                      {product.packaging.map((option, index) => (
                        <li key={index} className="text-gray-600 text-sm">
                          • {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.shelfLife && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-emerald-500" />
                      Shelf Life
                    </h3>
                    {typeof product.shelfLife === "string" ? (
                      <p className="text-gray-600 text-sm">
                        {product.shelfLife}
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {Object.entries(product.shelfLife).map(
                          ([key, value]) => (
                            <li key={key} className="text-gray-600 text-sm">
                              <span className="font-medium">{key}:</span>{" "}
                              {value}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Ready to Order?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-gray-600">
                        Global Shipping
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm text-gray-600">
                        Quality Assured
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleQuoteRequest}
                      className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center space-x-2"
                    >
                      <Quote className="w-5 h-5" />
                      <span>Request Quote</span>
                    </button>
                    <Link
                      to="/contact"
                      className="flex-1 border border-emerald-600 text-emerald-600 py-3 px-6 rounded-xl hover:bg-emerald-50 transition-colors font-medium text-center"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {category && category.products.length > 1 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products
                .filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    to={`/products/${category.id}/${relatedProduct.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={resolveProductImage(
                          relatedProduct.image || "",
                          "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                        )}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {relatedProduct.description}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to All Products</span>
          </Link>
        </div>
      </section>

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={handleCloseModal}
        productName={product.name}
        productCategory={product.category}
      />
    </div>
  );
};

export default ProductDetailPage;
