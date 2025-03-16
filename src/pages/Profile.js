import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const Profile = ({ userId, setUserId }) => {
  const htevents = window.htevents;
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    role: '',
    bio: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (newUserId, traits) => {
    // Identify the user with Hightouch
    htevents.identify(newUserId, traits);
    
    // Track login event
    htevents.track('User Logged In', {
      userId: newUserId,
      method: 'form',
      timestamp: new Date().toISOString()
    });
    
    // Update userId in parent component
    setUserId(newUserId);
  };
  
  const handleLogout = () => {
    // Track logout event before resetting
    htevents.track('User Logged Out', {
      userId: userId,
      sessionDuration: 'Unknown', // In a real app, you'd calculate this
      timestamp: new Date().toISOString()
    });
    
    // Reset the user session
    htevents.reset();
    
    // Clear user ID in parent component
    setUserId(null);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Track profile update event
    htevents.track('Profile Updated', {
      userId: userId,
      updatedFields: Object.keys(formData).filter(key => formData[key]),
      timestamp: new Date().toISOString()
    });
    
    // Update the user traits
    htevents.identify(userId, {
      ...formData,
      profileUpdatedAt: new Date().toISOString()
    });
    
    // Show success message (in a real app)
    alert('Profile updated successfully!');
  };

  return (
    <div className="page profile-page">
      <h2>User Profile</h2>
      
      {userId ? (
        <div className="profile-content">
          <div className="profile-header">
            <p>Welcome, <strong>{userId}</strong>!</p>
            <button onClick={handleLogout} className="demo-button logout-button">
              Logout
            </button>
          </div>
          
          <h3>Update Your Profile</h3>
          <p>Complete your profile information to personalize your experience:</p>
          
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select a role</option>
                <option value="developer">Developer</option>
                <option value="product_manager">Product Manager</option>
                <option value="marketing">Marketing</option>
                <option value="analytics">Data/Analytics</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Short Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us a bit about yourself..."
                rows="3"
              ></textarea>
            </div>
            
            <button type="submit" className="demo-button">Update Profile</button>
          </form>
          
          <div className="tracking-explanation">
            <h4>Tracking Information:</h4>
            <ul>
              <li>When you update your profile, an <code>identify</code> call is made with your traits</li>
              <li>A <code>Profile Updated</code> event is also tracked</li>
              <li>When you logout, a <code>User Logged Out</code> event is tracked</li>
              <li>After logout, a <code>reset</code> call clears your identity data</li>
            </ul>
          </div>
        </div>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Profile;