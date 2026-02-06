import React from 'react'

function Category() {
    const categories = [
      { name: "Electronics", icon: "💻", color: "bg-blue-100 text-blue-600" },
      { name: "Fashion", icon: "👔", color: "bg-pink-100 text-pink-600" },
      {
        name: "Home & Living",
        icon: "🏠",
        color: "bg-green-100 text-green-600",
      },
      { name: "Beauty", icon: "💄", color: "bg-purple-100 text-purple-600" },
      { name: "Sports", icon: "⚽", color: "bg-orange-100 text-orange-600" },
      { name: "Toys & Games", icon: "🎮", color: "bg-red-100 text-red-600" },
      { name: "Books", icon: "📚", color: "bg-yellow-100 text-yellow-600" },
      { name: "Groceries", icon: "🛒", color: "bg-teal-100 text-teal-600" },
    ];
  return (
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
  );
}

export default Category