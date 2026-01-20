import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(3);
  return (
    <div >
      <div className="bg-gray-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +1 (555) 123-4567
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Mail className="w-3 h-3" />
              support@duemart.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Track Order
            </span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold text-blue-600">
                Due<span className="text-gray-900">Mart</span>
              </a>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition relative">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Categories Bar - Desktop */}
          <div className="hidden md:flex items-center gap-8 py-3 border-t border-gray-200">
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Electronics
            </a>
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Fashion
            </a>
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Home & Garden
            </a>
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Sports
            </a>
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Books
            </a>
            <a href="#" className="hover:text-blue-600 transition font-medium">
              Toys
            </a>
            <a href="#" className="hover:text-blue-600 transition text-red-600">
              Deals
            </a>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-3">
                <a href="#" className="block py-2 hover:text-blue-600">
                  Electronics
                </a>
                <a href="#" className="block py-2 hover:text-blue-600">
                  Fashion
                </a>
                <a href="#" className="block py-2 hover:text-blue-600">
                  Home & Garden
                </a>
                <a href="#" className="block py-2 hover:text-blue-600">
                  Sports
                </a>
                <a href="#" className="block py-2 hover:text-blue-600">
                  Books
                </a>
                <a href="#" className="block py-2 hover:text-blue-600">
                  Toys
                </a>
                <a href="#" className="block py-2 text-red-600">
                  Deals
                </a>
                <div className="border-t border-gray-200 pt-3 space-y-3">
                  <a href="#" className="flex items-center gap-2 py-2">
                    <Heart className="w-5 h-5" /> Wishlist
                  </a>
                  <a href="#" className="flex items-center gap-2 py-2">
                    <ShoppingCart className="w-5 h-5" /> Cart ({cartCount})
                  </a>
                  <a href="#" className="flex items-center gap-2 py-2">
                    <User className="w-5 h-5" /> Account
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
