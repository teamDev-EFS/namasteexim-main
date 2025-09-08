import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Package, ArrowRight } from "lucide-react";
import { productCategories } from "../../data/products";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="mega-menu absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-2xl border-t border-gray-200 z-50 animate-fade-in lg:block hidden"
      style={{
        minHeight: "500px",
        maxHeight: "80vh",
        width: "90vw",
        maxWidth: "1400px",
        overflowY: "auto",
      }}
    >
      <div className="w-full px-6 sm:px-8 lg:px-8 xl:px-12 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Product Categories */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {productCategories.map((category) => (
                <div
                  key={category.id}
                  className="category-card group p-4 lg:p-6 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onMouseLeave={handleCategoryLeave}
                >
                  <div className="flex items-start space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                    <span className="text-2xl lg:text-3xl flex-shrink-0">
                      {category.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 lg:mb-3">
                        {category.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {category.subCategories && (
                    <div className="space-y-3 lg:space-y-4 mb-4 lg:mb-6">
                      {Object.entries(category.subCategories).map(
                        ([subCatName, items]) => (
                          <div key={subCatName} className="ml-6 lg:ml-8">
                            <h4 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2 lg:mb-3 text-emerald-700">
                              {subCatName}
                            </h4>
                            <ul className="space-y-1.5 lg:space-y-2">
                              {items.slice(0, 3).map((item, index) => (
                                <li key={index}>
                                  <Link
                                    to={`/products/${category.id}`}
                                    className="text-xs lg:text-sm text-gray-600 hover:text-emerald-600 transition-colors block line-clamp-1 hover:bg-emerald-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg"
                                    onClick={onClose}
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                              {items.length > 3 && (
                                <li>
                                  <Link
                                    to={`/products/${category.id}`}
                                    className="text-xs lg:text-sm text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center hover:bg-emerald-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg"
                                    onClick={onClose}
                                  >
                                    +{items.length - 3} more
                                    <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2" />
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Featured Products */}
                  <div className="space-y-2 lg:space-y-3">
                    <h4 className="text-xs lg:text-sm font-semibold text-gray-700 mb-2 lg:mb-3 text-emerald-700">
                      Featured Products
                    </h4>
                    <ul className="space-y-1.5 lg:space-y-2">
                      {category.products.slice(0, 3).map((product) => (
                        <li key={product.id}>
                          <Link
                            to={`/products/${category.id}/${product.id}`}
                            className="text-xs lg:text-sm text-gray-600 hover:text-emerald-600 transition-colors block flex items-center line-clamp-1 hover:bg-emerald-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg group"
                            onClick={onClose}
                          >
                            <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 mr-2 lg:mr-3 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                            <span className="truncate">{product.name}</span>
                          </Link>
                        </li>
                      ))}
                      {category.products.length > 3 && (
                        <li>
                          <Link
                            to={`/products/${category.id}`}
                            className="text-xs lg:text-sm text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center hover:bg-emerald-50 px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg"
                            onClick={onClose}
                          >
                            View all {category.products.length} products
                            <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Featured */}
          <div className="lg:col-span-1">
            <div className="quick-actions-section bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 lg:p-8 h-full sticky top-0">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-6 lg:mb-8">
                Quick Actions
              </h3>

              <div className="space-y-3 lg:space-y-4 mb-8 lg:mb-10">
                <Link
                  to="/products"
                  className="block w-full bg-emerald-600 text-white text-center py-3 lg:py-4 px-4 lg:px-6 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={onClose}
                >
                  View All Products
                </Link>

                <Link
                  to="/contact"
                  className="block w-full bg-white text-emerald-600 text-center py-3 lg:py-4 px-4 lg:px-6 rounded-xl border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  onClick={onClose}
                >
                  Request Quote
                </Link>
              </div>

              <div className="border-t border-emerald-200 pt-6 lg:pt-8">
                <h4 className="text-base lg:text-lg font-semibold text-gray-700 mb-4 lg:mb-6 text-emerald-800">
                  Popular Categories
                </h4>
                <div className="space-y-3 lg:space-y-4">
                  {productCategories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      to={`/products/${category.id}`}
                      className="flex items-center justify-between text-xs lg:text-sm text-gray-600 hover:text-emerald-600 transition-all duration-200 p-2 lg:p-3 rounded-xl hover:bg-white/70 group"
                      onClick={onClose}
                    >
                      <span className="flex items-center">
                        <span className="mr-2 lg:mr-3 text-base lg:text-lg">
                          {category.icon}
                        </span>
                        {category.name}
                      </span>
                      <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 transform rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
