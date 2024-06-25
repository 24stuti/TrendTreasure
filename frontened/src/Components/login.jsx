import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

const config = require('../Config/Constant');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [forgotPassword, setForgotPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => password.length >= 6;

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (!isLogin && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isLogin && name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleToggle = () => setIsLogin(!isLogin);



  const handleLoginSuccess = (email, role) => {
    console.log('Logged in successfully as', email);
    if (role === 'User') {
      window.location.href = '/'; // User dashboard route
    } else {
      window.location.href = '/admin'; // Admin dashboard route
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log('Logging in...');
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, role } = response.data;
      console.log(token);
      console.log(role);
      localStorage.setItem('token', token);
      handleLoginSuccess(email, role);
    } catch (error) {
      setErrors({ login: error.response?.data?.message || 'An unknown error occurred' });
      console.error('Login Error:', error);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      console.log('Signing up...');
      await axios.post( `${config.BASE_URL}users/register`,{ email, password, name });
      await handleLogin();
    } catch (error) {
      setErrors({ signup: error.response?.data?.message || 'An unknown error occurred' });
      console.error('Signup Error:', error);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: 'Email is required' });
      return;
    }

    try {
      console.log('Sending password reset request...');
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      console.log(response.data);
      setForgotPassword(false);
      setErrors({ success: 'Password reset email sent successfully' });
    } catch (error) {
      setErrors({ forgotPassword: error.response?.data?.message || 'An unknown error occurred' });
      console.error('Forgot Password Error:', error);
    }
  };

  
  

  return (
    <div className={`login-container ${isLogin ? 'login-active' : 'signup-active'}`}>
      <img src="/images/Banner1.png" alt="Banner" className="banner-image" />
      <div className="login-toggle">
        <button className={`toggle-button ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`toggle-button ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Signup</button>
      </div>
      <div className="form-container">
        {isLogin ? (
          <>
            <h2>Login</h2>
            <div className="email-login">
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              {errors.email && <p className="error">{errors.email}</p>}
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              {errors.password && <p className="error">{errors.password}</p>}
              <button onClick={handleLogin}>Login</button>
              {errors.login && <p className="error">{errors.login}</p>}
              <p>
                <a href="#" onClick={() => setForgotPassword(true)}>Forgot Password?</a>
              </p>
              {forgotPassword && (
                <div>
                  <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                  <button onClick={handleForgotPassword}>Send Reset Link</button>
                  {errors.forgotPassword && <p className="error">{errors.forgotPassword}</p>}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h2>Signup</h2>
            <div className="email-login">
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
              {errors.email && <p className="error">{errors.email}</p>}
              <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
              {errors.name && <p className="error">{errors.name}</p>}
              <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              {errors.password && <p className="error">{errors.password}</p>}
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
              <button onClick={handleSignup}>Signup</button>
              {errors.signup && <p className="error">{errors.signup}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
