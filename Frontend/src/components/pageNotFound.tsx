import React from "react";
import { Home, Search, ShoppingBag, ArrowLeft, Package } from "lucide-react";

const PageNotFound: React.FC = () => {
  const popularCategories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👗" },
    { name: "Home & Garden", icon: "🏡" },
    { name: "Sports", icon: "⚽" },
  ];

  const trendingProducts = [
    "Wireless Headphones",
    "Smart Watch",
    "Running Shoes",
    "Coffee Maker",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Main 404 Section */}
        <div className="text-center mb-12">
          {/* Animated 404 */}
          <div className="mb-8 relative">
            <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 animate-pulse">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Package className="w-24 h-24 text-gray-300 animate-bounce" />
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have wandered off. It might
            have been moved, deleted, or perhaps it never existed.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Home className="w-5 h-5" />
              Back to Home
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition border-2 border-gray-300 shadow-md hover:shadow-lg">
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12">
            <p className="text-sm text-gray-600 mb-3">
              Try searching for what you need:
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-6 py-4 pr-14 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Popular Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              Popular Categories
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-300 border-2 border-transparent transition text-left"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium text-gray-700">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trending Searches */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-600" />
              Trending Searches
            </h3>
            <div className="space-y-2">
              {trendingProducts.map((product, index) => (
                <button
                  key={index}
                  className="w-full text-left px-4 py-3 rounded-lg bg-gray-50 hover:bg-purple-50 hover:text-purple-700 transition text-gray-700 font-medium"
                >
                  {product}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still can't find what you're looking for?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-semibold underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
