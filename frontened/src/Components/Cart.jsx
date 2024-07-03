import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const config = require('../Config/Constant');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [pickupMessage, setPickupMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCartItems = async (token) => {
    try {
      const cartResponse = await fetch(`${config.BASE_URL}cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const cartData = await cartResponse.json();
      const cartItems = cartData.items;

      const updatedCart = await Promise.all(
        cartItems.map(async (cartItem) => {
          const productResponse = await fetch(`${config.BASE_URL}products/${cartItem.product._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!productResponse.ok) {
            throw new Error('Failed to fetch product details');
          }

          const productData = await productResponse.json();

          return {
            id: cartItem.product._id,
            name: productData.name,
            price: productData.price,
            quantity: cartItem.quantity,
            image: productData.imageUrl,
          };
        })
      );

      setCart(updatedCart);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart details:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${config.BASE_URL}users/verify-token`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to verify token');
        }

        await fetchCartItems(token);
      } catch (error) {
        console.error('Error verifying token:', error);
        navigate('/login');
      }
    };

    verifyToken();
  }, [navigate]);

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.BASE_URL}cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          quantity
        })
      });

      if (response.ok) {
        setPickupMessage('Your item has been added to the cart.');
        setTimeout(() => {
          setPickupMessage('');
        }, 3000);
        await fetchCartItems(token); // Refresh cart items after adding
      } else {
        const errorMessage = await response.text();
        console.error('Add to Cart Error:', errorMessage);
        setPickupMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Add to Cart Error:', error);
      setPickupMessage('An error occurred while adding to cart.');
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleIncreaseQuantity = async (productId) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === productId);
    if (index !== -1) {
      updatedCart[index].quantity++;
      setCart(updatedCart);

      try {
        const token = localStorage.getItem('token');
        await fetch(`${config.BASE_URL}cart/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: updatedCart[index].quantity
          })
        });
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(item => item.id === productId);
    if (index !== -1 && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);

      try {
        const token = localStorage.getItem('token');
        await fetch(`${config.BASE_URL}cart/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            quantity: updatedCart[index].quantity
          })
        });
      } catch (error) {
        console.error('Error updating cart item:', error);
      }
    } else if (index !== -1 && updatedCart[index].quantity === 1) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`${config.BASE_URL}cart/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        updatedCart.splice(index, 1);
        setCart(updatedCart);
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    }
  };

  const callRider = () => {
    setPickupMessage('Rider called for pickup !!');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Selling Cart</h2>
      <div className="product-list">
        {cart.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <p>{product.name}</p>
              <p>Price: ${product.price}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(product.id)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <p>Total Price: ${calculateTotalPrice()}</p>
        <button onClick={callRider}>Submit Order Now</button>
        {pickupMessage && <p>{pickupMessage}</p>}
        <button onClick={goToCart}>Go to Cart</button>
      </div>
    </div>
  );
};

export default Cart;
