import React, { useState, useEffect } from 'react';
import './Cart.css';

const config = require('../Config/Constant');

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [pickupMessage, setPickupMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const cartResponse = await fetch(`${config.BASE_URL}api/cart`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure to send the token for protected routes
          }
        });
        const cartData = await cartResponse.json();

        const cartItems = cartData.items;

        const updatedCart = await Promise.all(
          cartItems.map(async (cartItem) => {
            const productResponse = await fetch(`${config.BASE_URL}api/cart`, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            });
            const productData = await productResponse.json();

            return {
              id: cartItem.product._id,
              name: productData.name,
              price: productData.price, // Assuming price is stored in the product data
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

    fetchCartDetails();
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleIncreaseQuantity = async (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity++;

    setCart(updatedCart);

    await fetch(`${config.BASE_URL}api/cart/:id`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        productId: updatedCart[index].id,
        quantity: 1
      })
    });
  };

  const handleDecreaseQuantity = async (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;

      setCart(updatedCart);

      await fetch(`${config.BASE_URL}api/cart/:id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: updatedCart[index].id,
          quantity: -1
        })
      });
    } else {
      await fetch(`http://localhost:5000/api/cart/${updatedCart[index].id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      updatedCart.splice(index, 1);
      setCart(updatedCart);
    }
  };

  const callRider = () => {
    setPickupMessage('Rider called for pickup !!');
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
                <button onClick={() => handleDecreaseQuantity(index)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total-price">
        <p>Total Price: ${calculateTotalPrice()}</p>
        <button onClick={callRider}>Submit Order Now</button>
        {pickupMessage && <p>{pickupMessage}</p>}
      </div>
    </div>
  );
};

export default Cart;
