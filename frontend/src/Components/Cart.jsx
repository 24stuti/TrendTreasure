/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'; // Import your Cart component styles
const config = require('../Config/Constant');

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: '/cart' } });
        return;
      }

      const response = await axios.get(`${config.BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login', { state: { from: '/cart' } });
      } else {
        setError('Failed to fetch cart. Please try again.');
        setLoading(false);
      }
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.BASE_URL}cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      setError('Failed to remove item. Please try again.');
    }
  };

  const addItem = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${config.BASE_URL}cart`, 
        { productId, quantity }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      setError('Failed to add item. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cart || cart.items.length === 0) return <div className="empty-cart">Your cart is empty</div>;

  return (
    <div className="cart-container">
      <h2 className="cart-header">Your Cart</h2>
      {cart.items.map((item) => (
        <div key={item.product._id} className="cart-item">
          <img
            src={`data:image/jpeg;base64,${item.product.image}`}
            alt={item.product.name}
            className="cart-item-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.png'; // Replace with your placeholder image path
            }}
          />
          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.product.name}</h3>
            <p className="cart-item-price">Price: ${item.product.price}</p>
            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
          </div>
          <div className="cart-item-actions">
            <button className="cart-item-button remove" onClick={() => removeItem(item.product._id)}>Remove</button>
            <button className="cart-item-button add" onClick={() => addItem(item.product._id, 1)}>Add One</button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Cart.css'; // Make sure you have the styles for your cart component
import Footer from './Footer';
import Header from './Header';
const config = require('../Config/Constant');

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: '/cart' } });
        return;
      }

      const response = await axios.get(`${config.BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate('/login', { state: { from: '/cart' } });
      } else {
        setError('Failed to fetch cart. Please try again.');
        setLoading(false);
      }
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${config.BASE_URL}cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (err) {
      setError('Failed to remove item. Please try again.');
    }
  };

  const decrementItem = async (productId,quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${config.BASE_URL}cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      setError('Failed to decrement item quantity. Please try again.');
    }
  };

  const incrementItem = async (productId,quantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${config.BASE_URL}cart`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCart();
    } catch (err) {
      setError('Failed to increment item quantity. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!cart || cart.items.length === 0)
    return <div className="empty-cart">Your cart is empty</div>;

  return (
    <div>
    <Header/>
    <div className="cart-container">
    
      <h2 className="cart-header">Your Cart</h2>
      {cart.items.map((item) => (
        <div key={item.product._id} className="cart-item">
          <img
            src={`data:image/jpeg;base64,${item.product.image}`}
            alt={item.product.name}
            className="cart-item-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.png'; // Replace with your placeholder image path
            }}
          />
          <div className="cart-item-details">
            <h3 className="cart-item-name">{item.product.name}</h3>
            <p className="cart-item-price">Price: ${item.product.price}</p>
            <div className="quantity-controls">
              <button className="cart-item-button decrement" onClick={() => decrementItem(item.product._id,1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button className="cart-item-button increment" onClick={() => incrementItem(item.product._id,1)}>
                +
              </button>
            </div>
          </div>
          <div className="cart-item-actions">
            <button className="cart-item-button remove" onClick={() => removeItem(item.product._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <h3>Total: ${cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</h3>
      </div>
      <button className="buy-now-button" onClick={() => alert('Your order has been placed!')}>
        Buy Now
      </button>
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
