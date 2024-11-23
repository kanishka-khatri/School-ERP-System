import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend for login
      const res = await axios.post('http://localhost:5000/api/teachers/login', {
        email,
        password,
      });

      if (res.status === 200) {
        // Store teacher details and token in localStorage
        localStorage.setItem('token', 'teacher-token'); // Placeholder token, replace with actual token if necessary
        localStorage.setItem('teacher', JSON.stringify(res.data.teacher)); // Store teacher data
        localStorage.setItem('email', email); // Store the email for further use

        // Redirect to the teacher dashboard
        navigate('/teacher');
      } else {
        setError(res.data.message || 'Login failed');
      }
    } catch (err) {
      // Handle errors
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Handle forgot password functionality
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Logic for resetting password (backend integration can be added later)
    if (email) {
      setResetMessage('A password reset link has been sent to your email.');
    } else {
      setResetMessage('Please enter a valid email address.');
    }
  };

  return (
    <div className="login-page-body">
      <div className="login-page">
        <h1>{isForgotPassword ? 'Forgot Password' : 'Teacher Login'}</h1>
        {!isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">Login</button>
            <div className="forgot-password-link">
              <p onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label>Enter your email to reset password:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            <button type="submit" className="reset-button">Send Reset Link</button>
            <div className="back-to-login">
              <p onClick={() => setIsForgotPassword(false)}>Back to Login</p>
            </div>
            {resetMessage && <p className="reset-message">{resetMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
