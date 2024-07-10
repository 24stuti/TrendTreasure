import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './OrderSummary.css';

const config = require('../Config/Constant');

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login', { state: { from: `/order/${id}` } });
          return;
        }

        if (id) {
          // If we have an order ID, fetch the existing order
          const response = await axios.get(`${config.BASE_URL}orders/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOrder(response.data);
        } else if (location.state && location.state.orderData) {
          // If we have order data from the checkout process, create a new order
          await createOrder(location.state.orderData, token);
        } else {
          setError('No order data available');
        }
        setLoading(false);
      } catch (err) {
        setError('Error fetching or creating order details. Please try again.');
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate, location]);

  const createOrder = async (orderData, token) => {
    try {
      const response = await axios.post(`${config.BASE_URL}orders`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(response.data);
      // Optionally, you can redirect to the new order's page
      navigate(`/order/${response.data._id}`, { replace: true });
    } catch (error) {
      setError(`Error creating order: ${error.response?.data?.message || error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-summary">
      <Header />
      <div className="order-summary-container">
        <h1>Order Summary</h1>
        <div className="order-info">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
          <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Not Paid'}</p>
        </div>
        <div className="shipping-info">
          <h2>Shipping</h2>
          <p><strong>Name:</strong> {order.user.name}</p>
          <p><strong>Email:</strong> {order.user.email}</p>
          <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
        </div>
        <div className="order-items">
          <h2>Order Items</h2>
          <ul>
            {order.orderItems.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>{item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-summary-details">
          <h2>Order Summary</h2>
          <p><strong>Items:</strong> ₹{order.itemsPrice.toFixed(2)}</p>
          <p><strong>Shipping:</strong> ₹{order.shippingPrice.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{order.taxPrice.toFixed(2)}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice.toFixed(2)}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSummary;