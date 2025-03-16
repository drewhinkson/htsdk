import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Profile from './pages/Profile';

// Components
import EventLogger from './components/EventLogger';

// Make htevents globally accessible through window
const htevents = window.htevents;

// Route wrapper to handle page tracking
const TrackedRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view whenever the location changes
    const path = location.pathname;
    const pageName = path.substring(1) || 'home';
    
    htevents.page('Website', pageName, {
      path: path,
      url: window.location.href,
      title: getPageTitle(pageName)
    });
    
    console.log(`Page tracked: ${pageName}`, { path, url: window.location.href });
  }, [location]);
  
  // Helper function to get a nice page title
  const getPageTitle = (pageName) => {
    switch(pageName) {
      case 'home':
        return 'Home Page';
      case 'about':
        return 'About Page';
      case 'products':
        return 'Products Page';
      case 'profile':
        return 'User Profile';
      default:
        return pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
  };
  
  return <Component {...rest} />;
};

function App() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Override the track method to log events
    const originalTrack = htevents.track;
    htevents.track = function() {
      const eventName = arguments[0];
      const properties = arguments[1] || {};
      
      // Log the event
      setEvents(prev => [...prev, {
        type: 'track',
        name: eventName,
        properties,
        timestamp: new Date().toISOString()
      }]);
      
      console.log(`Event tracked: ${eventName}`, properties);
      
      // Call the original track method
      return originalTrack.apply(this, arguments);
    };

    // Override the page method
    const originalPage = htevents.page;
    htevents.page = function() {
      const category = arguments[0];
      const name = arguments[1];
      const properties = arguments[2] || {};
      
      // Log the page view
      setEvents(prev => [...prev, {
        type: 'page',
        category,
        name,
        properties,
        timestamp: new Date().toISOString()
      }]);
      
      // Call the original page method
      return originalPage.apply(this, arguments);
    };

    // Override the identify method
    const originalIdentify = htevents.identify;
    htevents.identify = function() {
      const userId = arguments[0];
      const traits = arguments[1] || {};
      
      // Update the userId state
      setUserId(userId);
      
      // Log the identify call
      setEvents(prev => [...prev, {
        type: 'identify',
        userId,
        traits,
        timestamp: new Date().toISOString()
      }]);
      
      console.log(`User identified: ${userId}`, traits);
      
      // Call the original identify method
      return originalIdentify.apply(this, arguments);
    };

  }, []);

  const handleReset = () => {
    htevents.reset();
    setUserId(null);
    setEvents(prev => [...prev, {
      type: 'reset',
      timestamp: new Date().toISOString()
    }]);
    console.log('User session reset');
  };

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Hightouch SDK Demo</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">Products</Link>
            <Link to="/profile">Profile</Link>
          </nav>
          <div className="user-status">
            {userId ? (
              <>
                <span>Logged in as: {userId}</span>
                <button onClick={handleReset}>Logout</button>
              </>
            ) : (
              <span>Not logged in</span>
            )}
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<TrackedRoute component={Home} />} />
            <Route path="/about" element={<TrackedRoute component={About} />} />
            <Route path="/products" element={<TrackedRoute component={Products} />} />
            <Route path="/profile" element={<TrackedRoute component={Profile} userId={userId} setUserId={setUserId} />} />
          </Routes>
        </main>

        <EventLogger events={events} />
      </div>
    </Router>
  );
}

export default App;