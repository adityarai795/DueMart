import React, { useEffect, useState } from "react";
import { ArrowRight,  ShoppingCart } from "lucide-react";
import { productService } from "../../services/productService";
import { useCart } from "../../context/cartContext";
import { Link } from "react-router-dom";
interface Product {
  _id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  image_url: string;
}

const ProductComponent = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getAllProducts({ page: 1, limit: 8 });
        setProducts(res.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <section className="container mx-auto px-6 py-16 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Featured Products
          <span className="text-sm text-blue-600 ml-2">
            ({products.length})
          </span>
        </h2>

        <Link to="/products">
        <button className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
          View All <ArrowRight className="w-5 h-5" />
          </button>
          </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">
                {product.product_name}
              </h3>

              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.product_description}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">
                  ₹{product.product_price.toLocaleString()}
                </span>

                <button
                  onClick={() => {
                    addToCart({
                      id: product._id,
                      name: product.product_name,
                      price: product.product_price,
                      description: product.product_description,
                      image: product.image_url,
                    });
                    setAddedItems((prev) => new Set(prev).add(product._id));
                    setTimeout(() => {
                      setAddedItems((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(product._id);
                        return newSet;
                      });
                    }, 1500);
                  }}
                  className={`${
                    addedItems.has(product._id)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {addedItems.has(product._id) ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductComponent;
