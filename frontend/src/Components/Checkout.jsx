import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './Checkout.css';

const config = require('../Config/Constant');

const Checkout = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [orderSummary, setOrderSummary] = useState({
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.address) {
      setAddress(location.state.address);
    } else {
      navigate('/address');
    }
    fetchTotalPrice();
  }, [location, navigate]);

  const fetchTotalPrice = async () => {
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
      
      const itemsPrice = response.data.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const shippingPrice = itemsPrice > 500 ? 0 : 50; // Free shipping for orders over 500
      const taxPrice = itemsPrice * 0.18; // 18% tax
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
  
      setOrderSummary({
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      
      setTotalPrice(totalPrice);
    } catch (err) {
      console.log("Error while getting prices:", err);
      setMessage("Error fetching cart details. Please try again.");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async () => {
    if (paymentMethod === 'cod') {
      setOrderPlaced(true);
      return;
    }
  
    setIsLoading(true);
    setMessage('');
  
    try {
      const token = localStorage.getItem('token');
      
      const cartResponse = await axios.get(`${config.BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Additional payment method logic goes here

    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  
    setIsLoading(false);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setMessage('');
  
    try {
      const token = localStorage.getItem('token');
      
      const cartResponse = await axios.get(`${config.BASE_URL}cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const orderItems = cartResponse.data.items.map(item => ({
        name: item.product.name,
        qty: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
      }));
  
      const order = {
        orderItems,
        shippingAddress: {
          address: address.address,
          city: address.city,
          postalCode: address.pincode,
          country: 'India',
        },
        paymentMethod,
        itemsPrice: orderSummary.itemsPrice,
        shippingPrice: orderSummary.shippingPrice,
        taxPrice: orderSummary.taxPrice,
        totalPrice: orderSummary.totalPrice,
      };
  
      const response = await axios.post(`${config.BASE_URL}orders`, order, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 201) {
        setMessage('Order placed successfully!');
        navigate(`/order/${response.data._id}`);
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
    }
  
    setIsLoading(false);
  };

  if (!address) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-page">
      <Header />
      <div className="checkout-container">
        <h2>Checkout</h2>
        <div className="checkout-address">
          <h3>Shipping Address</h3>
          <p>{address.name}</p>
          <p>{address.address}</p>
          <p>{address.pincode}</p>
          <p>{address.phoneNo}</p>
          <p>{address.email}</p>
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Items: ₹{orderSummary.itemsPrice.toFixed(2)}</p>
          <p>Shipping: ₹{orderSummary.shippingPrice.toFixed(2)}</p>
          <p>Tax: ₹{orderSummary.taxPrice.toFixed(2)}</p>
          <p className="checkout-total">Total: ₹{orderSummary.totalPrice.toFixed(2)}</p>
        </div>
        <div className="checkout-payment">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input type="radio" name="paymentMethod" value="card"
                     onChange={() => handlePaymentMethodChange('card')}/>
              Credit/Debit Card
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="upi"
                     onChange={() => handlePaymentMethodChange('upi')}/>
              UPI
            </label>
            <label>
              <input type="radio" name="paymentMethod" value="cod"
                     onChange={() => handlePaymentMethodChange('cod')}/>
              Cash on Delivery
            </label>
          </div>
        </div>
        {paymentMethod === 'card' && (
          <div className="checkout-card-details">
            <input type="text" name="number" placeholder="Card Number" onChange={handleCardInputChange} />
            <input type="text" name="name" placeholder="Name on Card" onChange={handleCardInputChange} />
            <input type="text" name="expiry" placeholder="MM/YY" onChange={handleCardInputChange} />
            <input type="text" name="cvv" placeholder="CVV" onChange={handleCardInputChange} />
          </div>
        )}
        {paymentMethod === 'upi' && (
          <div className="checkout-upi-details">
            <input type="text" placeholder="UPI ID" onChange={(e) => setUpiId(e.target.value)} />
          </div>
        )}
        {paymentMethod === 'cod' && orderPlaced ? (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Items: ₹{orderSummary.itemsPrice.toFixed(2)}</p>
            <p>Shipping: ₹{orderSummary.shippingPrice.toFixed(2)}</p>
            <p>Tax: ₹{orderSummary.taxPrice.toFixed(2)}</p>
            <p className="checkout-total">Total: ₹{orderSummary.totalPrice.toFixed(2)}</p>
            <button className="place-order-button" onClick={handlePlaceOrder} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        ) : (
          <button className="checkout-button" onClick={handleCheckout} disabled={isLoading || !paymentMethod}>
            {isLoading ? 'Processing...' : paymentMethod === 'cod' ? 'Continue to Place Order' : `Pay ₹${orderSummary.totalPrice.toFixed(2)}`}
          </button>
        )}
        {message && <p className={`checkout-message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
