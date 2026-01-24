import  { useState } from "react";
import {
  ShoppingCart,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Gift,
  Truck,
  Shield,
  Headphones,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Summer Sale Collection",
      subtitle: "Up to 70% off on selected items",
      bg: "from-orange-500 to-pink-500",
      image: "🌞",
    },
    {
      title: "New Electronics Arrivals",
      subtitle: "Latest tech at unbeatable prices",
      bg: "from-blue-600 to-purple-600",
      image: "⚡",
    },
    {
      title: "Fashion Forward",
      subtitle: "Trending styles for every season",
      bg: "from-pink-500 to-rose-600",
      image: "👗",
    },
  ];

  const categories = [
    { name: "Electronics", icon: "💻", color: "bg-blue-100 text-blue-600" },
    { name: "Fashion", icon: "👔", color: "bg-pink-100 text-pink-600" },
    { name: "Home & Living", icon: "🏠", color: "bg-green-100 text-green-600" },
    { name: "Beauty", icon: "💄", color: "bg-purple-100 text-purple-600" },
    { name: "Sports", icon: "⚽", color: "bg-orange-100 text-orange-600" },
    { name: "Toys & Games", icon: "🎮", color: "bg-red-100 text-red-600" },
    { name: "Books", icon: "📚", color: "bg-yellow-100 text-yellow-600" },
    { name: "Groceries", icon: "🛒", color: "bg-teal-100 text-teal-600" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 89.99,
      oldPrice: 129.99,
      rating: 4.8,
      reviews: 1234,
      image: "🎧",
      badge: "Hot",
    },
    {
      id: 2,
      name: "Smart Watch Ultra",
      price: 299.99,
      oldPrice: 399.99,
      rating: 4.9,
      reviews: 890,
      image: "⌚",
      badge: "New",
    },
    {
      id: 3,
      name: "Premium Sneakers",
      price: 129.99,
      oldPrice: 179.99,
      rating: 4.7,
      reviews: 2100,
      image: "👟",
      badge: "Sale",
    },
    {
      id: 4,
      name: "Coffee Maker Deluxe",
      price: 149.99,
      oldPrice: 199.99,
      rating: 4.6,
      reviews: 567,
      image: "☕",
      badge: "Hot",
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      oldPrice: 69.99,
      rating: 4.5,
      reviews: 432,
      image: "💻",
      badge: "Sale",
    },
    {
      id: 6,
      name: "Yoga Mat Premium",
      price: 39.99,
      oldPrice: 59.99,
      rating: 4.7,
      reviews: 789,
      image: "🧘",
      badge: "New",
    },
    {
      id: 7,
      name: "LED Desk Lamp",
      price: 34.99,
      oldPrice: 49.99,
      rating: 4.4,
      reviews: 654,
      image: "💡",
      badge: "Hot",
    },
    {
      id: 8,
      name: "Water Bottle Pro",
      price: 24.99,
      oldPrice: 34.99,
      rating: 4.6,
      reviews: 1001,
      image: "🥤",
      badge: "Sale",
    },
  ];

  const deals = [
    {
      title: "Flash Deal",
      description: "Limited time offers",
      icon: Zap,
      color: "bg-yellow-500",
    },
    {
      title: "Daily Deals",
      description: "New deals every day",
      icon: Gift,
      color: "bg-red-500",
    },
    {
      title: "Trending",
      description: "Most popular items",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
  ];

  const features = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $50" },
    { icon: Shield, title: "Secure Payment", description: "100% protected" },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Always here to help",
    },
    { icon: Gift, title: "Gift Cards", description: "Perfect for everyone" },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-125 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`h-full bg-linear-to-r ${slide.bg} flex items-center justify-center`}
            >
              <div className="container mx-auto px-6 flex items-center justify-between">
                <div className="text-white max-w-xl">
                  <h1 className="text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-2xl mb-8 text-white/90">
                    {slide.subtitle}
                  </p>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition flex items-center gap-2 shadow-lg">
                    Shop Now <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-9xl">{slide.image}</div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Deals Banner */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, index) => {
            const Icon = deal.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer"
              >
                <div className={`${deal.color} p-4 rounded-xl`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{deal.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition cursor-pointer group"
            >
              <div
                className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition`}
              >
                {category.icon}
              </div>
              <p className="text-sm font-medium text-gray-700 text-center">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 py-16 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Featured Products
          </h2>
          <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
            View All <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition group"
            >
              <div className="relative">
                <div className="bg-linear-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center text-7xl">
                  {product.image}
                </div>
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {product.badge}
                </span>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ${product.oldPrice}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-linear-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Get the latest deals and exclusive offers delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
