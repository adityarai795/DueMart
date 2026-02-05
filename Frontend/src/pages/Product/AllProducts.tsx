import React, { useEffect } from 'react'
import { productService } from '../../services/productService';
function AllProducts() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => { 
    try {
      const response = await productService.getAllProducts();
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  return (
    <>
      <h1>All Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  )
}

export default AllProducts