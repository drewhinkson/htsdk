import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (error) setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    // In a real app, you would validate with a server
    // For this demo, we'll just accept the login
    
    // Generate a user ID based on email
    const userId = `user-${formData.email.split('@')[0]}`;
    
    // Call the onLogin callback with user info
    onLogin(userId, {
      email: formData.email,
      lastLogin: new Date().toISOString()
    });
  };
  
  return (
    <div className="login-form-container">
      <h3>Login to Your Account</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your password"
            required
          />
          <small className="form-hint">(Any password will work for this demo)</small>
        </div>
        
        <button type="submit" className="demo-button login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;