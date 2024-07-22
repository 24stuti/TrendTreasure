import React from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import Header from './Header';
import Footer from './Footer';

const SearchResults = () => {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <>
    <Header />
    <div className="search-results-container">
      <h2>Search Results</h2>
      {products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">Price: ₹{product.price}</p>
              
            </div>
          ))}

        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
    < Footer/>
    </>
  );
};

export default SearchResults;
