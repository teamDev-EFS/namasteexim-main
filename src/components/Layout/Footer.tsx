import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin as LinkedIn, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">NE</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Namaste EXIM</h3>
                <p className="text-gray-400">Ventures</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's premier agro export company, delivering finest quality rice and agricultural products to the world with ethical sourcing and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <LinkedIn className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">Product Catalogue</Link></li>
              <li><Link to="/global-markets" className="text-gray-400 hover:text-white transition-colors">Global Markets</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/partnerships" className="text-gray-400 hover:text-white transition-colors">Partnerships</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Top Products</h4>
            <ul className="space-y-3">
              <li><Link to="/products/rice/basmati" className="text-gray-400 hover:text-white transition-colors">Basmati Rice</Link></li>
              <li><Link to="/products/rice/perfumed" className="text-gray-400 hover:text-white transition-colors">Perfumed Rice</Link></li>
              <li><Link to="/products/nuts/cashew" className="text-gray-400 hover:text-white transition-colors">Cashew Nuts</Link></li>
              <li><Link to="/products/spices/cardamom" className="text-gray-400 hover:text-white transition-colors">Cardamom</Link></li>
              <li><Link to="/products/eggs/fresh" className="text-gray-400 hover:text-white transition-colors">Fresh Eggs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-amber-400">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Mumbai, Maharashtra</p>
                  <p>India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-gray-400">info@namasteexim.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Namaste EXIM Ventures. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
              <Link to="/certifications" className="text-gray-400 hover:text-white text-sm transition-colors">Certifications</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;