import React from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const wishlistItems = [
  {
    _id: "1",
    name: "Wacom Intuos Pro Medium",
    price: 34999,
    image: "https://example.com/images/wacom-intuos-pro.jpg",
  },
  {
    _id: "2",
    name: "Microsoft Surface Pro 8",
    price: 99999,
    image: "https://example.com/images/surface-pro-8.jpg",
  },
];

function WishlistPage() {
  return (
    <section className="container mx-auto px-6 py-16 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="text-red-500" />
          My Wishlist
          <span className="text-sm text-blue-600">
            ({wishlistItems.length})
          </span>
        </h1>
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mt-2">
            Save items you love to see them here ❤️
          </p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Continue Shopping
          </button>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50">
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-xl font-bold text-gray-900 mt-2">
                  ₹{item.price.toLocaleString()}
                </p>

                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4" />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default WishlistPage;
