import { useState } from "react";
import {
  ArrowRight,

  ChevronLeft,
  ChevronRight,
} from "lucide-react";
function HeroSection() {
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



  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );

  return (
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
                <p className="text-2xl mb-8 text-white/90">{slide.subtitle}</p>
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
  );
}

export default HeroSection;
