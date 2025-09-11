import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Globe, Award } from "lucide-react";
import MegaMenu from "./MegaMenu";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMegaMenuOpen(false);
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const closeMegaMenu = () => {
    setIsMegaMenuOpen(false);
  };

  return (
    <>
      {/* Main Header - Integrated Design */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-white/95 backdrop-blur-xl shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Contact Info Row - Compact */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span>+91-7806070556</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-3 h-3" />
                <span>info@namasteeximventures.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Globe className="w-3 h-3" />
                <span>Global Export Excellence</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>ISO Certified</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src="/images/namaste-exim-new-logo.jpeg"
                  alt="Namaste EXIM Ventures Logo"
                  className="h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-lg"
                  onError={(e) => {
                    // Fallback to premium SVG if image fails to load
                    e.currentTarget.style.display = "none";
                    const nextElement = e.currentTarget
                      .nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = "block";
                    }
                  }}
                />
                <div className="hidden h-14 w-auto">
                  <img
                    src="/namaste-exim-logo-premium.svg"
                    alt="Namaste EXIM Ventures Premium Logo"
                    className="h-full w-auto filter drop-shadow-lg"
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Home
              </Link>

              <div className="relative mega-menu-container">
                <button
                  onClick={toggleMegaMenu}
                  className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  <span>Products</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isMegaMenuOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isMegaMenuOpen && (
                  <MegaMenu isOpen={isMegaMenuOpen} onClose={closeMegaMenu} />
                )}
              </div>

              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                About
              </Link>

              <Link
                to="/global-markets"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Global Markets
              </Link>

              <Link
                to="/partnerships"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Partnerships
              </Link>

              <Link
                to="/team"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Team
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link
                to="/quote"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>

              <Link
                to="/about"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                About
              </Link>

              <Link
                to="/global-markets"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Global Markets
              </Link>

              <Link
                to="/partnerships"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Partnerships
              </Link>

              <Link
                to="/team"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Team
              </Link>

              <Link
                to="/contact"
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
              >
                Contact
              </Link>

              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/quote"
                  className="block w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-center py-3 px-6 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;
