// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import './ProductList.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const config = require('../Config/Constant');

const ProductList = ({ match }) => {
  const categoryName = match.params.categoryName;
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}products/category/${categoryName}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    const initialQuantities = {};
    products.forEach(product => {
      initialQuantities[product.name] = 1;
    });
    setQuantities(initialQuantities);
  }, [products]);

  const handleIncrement = (item) => {
    setQuantities({ ...quantities, [item]: quantities[item] + 1 });
  };

  const handleDecrement = (item) => {
    if (quantities[item] > 1) {
      setQuantities({ ...quantities, [item]: quantities[item] - 1 });
    }
  };

  const handleAddToCart = (item) => {
    console.log(`Added ${quantities[item]} ${item}(s) to cart.`);
  };

  return (
    <>
      <Header />
      <div className="category-container">
        <h2>Choose your {categoryName}:</h2>
        <div className="item-list">
          {products.map((product, index) => (
            <div key={index} className="item">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(product.name)}>-</button>
                <span>{quantities[product.name]}</span>
                <button onClick={() => handleIncrement(product.name)}>+</button>
              </div>
              <button className="add-to-cart" onClick={() => handleAddToCart(product.name)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
