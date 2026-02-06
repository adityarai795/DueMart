import {
  Gift,
  Truck,
  Shield,
  Headphones
} from "lucide-react";

import ProductComponent from "../Product/ProductComponent";
import HeroSection from "./HeroSection";
import Category from "../../components/Category";
import Banner from "./Banner";
function Home() {

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
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section with Carousel */}
      <HeroSection />
      {/* Quick Deals Banner */}
     
      <Banner />
      {/* Categories Section */}
 
      <Category />
      {/* Featured Products */}
      <ProductComponent/>

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
