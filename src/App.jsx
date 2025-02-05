import React, { useEffect, useState } from 'react';
import Scrape from "./component/scrape";

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <img
        src={product.image || 'https://via.placeholder.com/300x200'} // Image fallback
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6 bg-white">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mt-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
              Add to Cart
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-full hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 transition-all duration-200">
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch scraped data from your server (e.g., Node.js API)
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/scrape'); // Adjust to your API route
      const data = await response.json();
      setProducts(data.products);  // Assuming 'products' is an array in your scraped data
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6">
      <h2 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mb-12">
        Our Product Range
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          <p>No Products Available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
