import React, { useState } from 'react';
import { ShoppingCart, MapPin, Phone } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick, currentPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">🍕</div>
            <span className="text-2xl font-bold text-dark hidden sm:inline">Foodio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className={`${currentPage === 'home' ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary`}>
              Home
            </a>
            <a href="#" className={`${currentPage === 'orders' ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary`}>
              Orders
            </a>
            <a href="#" className={`${currentPage === 'admin' ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary`}>
              Admin
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Info */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600 text-sm">
              <MapPin size={16} className="text-primary" />
              <span>4 KM Radius</span>
            </div>

            {/* Contact */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600 text-sm">
              <Phone size={16} className="text-primary" />
              <span>+91 7841967288</span>
            </div>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <div className="px-4 py-3 space-y-2">
            <a href="#" className="block py-2 text-gray-600 hover:text-primary">
              Home
            </a>
            <a href="#" className="block py-2 text-gray-600 hover:text-primary">
              Orders
            </a>
            <a href="#" className="block py-2 text-gray-600 hover:text-primary">
              Admin
            </a>
            <div className="py-2 border-t">
              <p className="text-sm text-gray-600">
                <MapPin size={14} className="inline mr-1" />
                4 KM Delivery Radius
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <Phone size={14} className="inline mr-1" />
                +91 7841967288
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
