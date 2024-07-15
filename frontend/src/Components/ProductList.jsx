import React, { useState, useEffect } from 'react';
import './ProductList.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { useAlert } from '../Contexts/AlertContext';
import { useParams, useNavigate } from 'react-router-dom';

const config = require('../Config/Constant');

const ProductList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [addToCartMessage, setAddToCartMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}products/category/${categoryName}`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        showAlert("Error fetching products", "error")
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  useEffect(() => {
    const initialQuantities = {};
    if (Array.isArray(products)) {
      products.forEach(product => {
        initialQuantities[product.name] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [products]);

  const handleIncrement = (item) => {
    setQuantities({ ...quantities, [item]: quantities[item] + 1 });
  };

  const handleDecrement = (item) => {
    if (quantities[item] > 1) {
      setQuantities({ ...quantities, [item]: quantities[item] - 1 });
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showAlert("No token found. Please log in again!", "error")
        throw new Error('No token found. Please log in again.');
      }
  
      const response = await axios.post(
        `${config.BASE_URL}cart`,
        {
          productId: product._id,
          quantity: quantities[product.name]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 201) {
        //setAddToCartMessage(`Added ${quantities[product.name]} ${product.name}(s) to cart.`);
        showAlert(`Added ${quantities[product.name]} ${product.name}(s) to cart.`, 'success');
        // setTimeout(() => {
        //   setAddToCartMessage('');
        // }, 3000);
      } else {
        showAlert('Error adding to cart!', 'error');
        console.error('Error adding to cart:', response.data.error);
      }
    } catch (error) {
      showAlert('Error adding to cart!', 'error');
      console.error('Error adding to cart:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="category-container">
        <h2>Explore {categoryName} Essentials - Your Next Favorite Finds!</h2>
        <div className="item-list">
          {products.map((product, index) => (
            <div key={index} className="item">
              <img 
                src={`data:image/jpeg;base64,${product.image}`} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/placeholder.png';
                }} 
              />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(product.name)}>-</button>
                <span>{quantities[product.name]}</span>
                <button onClick={() => handleIncrement(product.name)}>+</button>
              </div>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
              {addToCartMessage && <div className="add-to-cart-message">{addToCartMessage}</div>}
            </div>
          ))}
        </div>
        <button className="go-to-cart-button" onClick={() => navigate('/cart')}>Go to Cart</button>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
