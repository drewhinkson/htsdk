import React, { useState } from 'react';

const About = () => {
  const htevents = window.htevents;
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    // Track tab change
    htevents.track('Tab Changed', {
      page: 'About',
      tabName: tab
    });
  };
  
  const handleLearnMoreClick = (topic) => {
    htevents.track('Learn More Clicked', {
      topic: topic,
      location: 'About Page'
    });
  };

  return (
    <div className="page about-page">
      <h2>About page, super basic and cool</h2>
      <p>Purpose of the events SDK is to track user behaviour across the site ,or app </p>
      
      <div className="tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabClick('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => handleTabClick('features')}
          >
            Features
          </button>
          <button 
            className={`tab-button ${activeTab === 'implementation' ? 'active' : ''}`}
            onClick={() => handleTabClick('implementation')}
          >
            Implementation
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <h3>What is Hightouch Events SDK?</h3>
              <p>The Hightouch Events SDK is a JavaScript library that helps you track user interactions on your website. It allows you to send data about page views, user actions, and user identities to Hightouch.</p>
              <button 
                className="demo-button"
                onClick={() => handleLearnMoreClick('SDK Overview')}
              >
                Learn More
              </button>
            </div>
          )}
          
          {activeTab === 'features' && (
            <div className="tab-panel">
              <h3>Key Features</h3>
              <ul className="feature-list">
                <li>
                  <div className="feature-icon">📄</div>
                  <div className="feature-info">
                    <h4>Page View Tracking</h4>
                    <p>Automatically tracks navigation between pages</p>
                    <button 
                      className="demo-button small"
                      onClick={() => handleLearnMoreClick('Page View Tracking')}
                    >
                      Details
                    </button>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">🔔</div>
                  <div className="feature-info">
                    <h4>Custom Event Tracking</h4>
                    <p>Track user interactions like button clicks</p>
                    <button 
                      className="demo-button small"
                      onClick={() => handleLearnMoreClick('Custom Event Tracking')}
                    >
                      Details
                    </button>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">👤</div>
                  <div className="feature-info">
                    <h4>User Identification</h4>
                    <p>Associate events with specific users</p>
                    <button 
                      className="demo-button small"
                      onClick={() => handleLearnMoreClick('User Identification')}
                    >
                      Details
                    </button>
                  </div>
                </li>
                <li>
                  <div className="feature-icon">🔄</div>
                  <div className="feature-info">
                    <h4>Session Reset</h4>
                    <p>Clear user data when they log out</p>
                    <button 
                      className="demo-button small"
                      onClick={() => handleLearnMoreClick('Session Reset')}
                    >
                      Details
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          )}
          
          {activeTab === 'implementation' && (
            <div className="tab-panel">
              <h3>How to Implement</h3>
              <p>There are two ways to include the Hightouch Events SDK in your project:</p>
              
              <div className="implementation-methods">
                <div className="implementation-method">
                  <h4>Script Tag</h4>
                  <p>Add the script tag to your HTML page:</p>
                  <pre className="code-block">{`<script>
!function(){var e=window.htevents=window.htevents||[];
// ... (Hightouch script code)
e.load('f0212b164993bb1a897ad775ab65ca15d78436cc10669e3ee97a3534ba2292e2')
}();
</script>`}</pre>
                  <button 
                    className="demo-button small"
                    onClick={() => handleLearnMoreClick('Script Tag Implementation')}
                  >
                    Learn More
                  </button>
                </div>
                
                <div className="implementation-method">
                  <h4>NPM Package</h4>
                  <p>Install via NPM:</p>
                  <pre className="code-block">{`npm install @ht-sdks/events-sdk-js-browser

// Then import and initialize
import { HtEventsBrowser } from "@ht-sdks/events-sdk-js-browser";
const htevents = HtEventsBrowser.load({ writeKey: "f0212b164993bb1a897ad775ab65ca15d78436cc10669e3ee97a3534ba2292e2" });`}</pre>
                  <button 
                    className="demo-button small"
                    onClick={() => handleLearnMoreClick('NPM Implementation')}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;