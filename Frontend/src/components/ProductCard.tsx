import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/cartContext";
import "./ProductCard.css";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

const ProductCard: React.FC<ProductProps> = ({
  id,
  name,
  price,
  image,
  description,
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
      description,
    });
    alert(`✅ ${name} added to cart!`);
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3>{name}</h3>
        {description && <p className="description">{description}</p>}
        <div className="product-footer">
          <span className="price">₹{price.toFixed(2)}</span>
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            title="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
