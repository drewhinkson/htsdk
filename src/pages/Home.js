import React, { useState } from 'react';

const Home = () => {
  const htevents = window.htevents;
  const [isAnimating, setIsAnimating] = useState(false);
  
  const [eventConfig, setEventConfig] = useState({
    useProperties: true,
    useContextOverrides: false
  });
 
  const handleButtonClick = () => {
    setIsAnimating(true);
   
    const eventName = 'Button Clicked';
    
    const properties = eventConfig.useProperties ? {
      location: 'Home Page',
      buttonName: 'Welcome Button'
    } : {};
    
   
    const context = eventConfig.useContextOverrides ? {
      page: {
        title: 'Custom Page Title', 
        referrer: 'https://example.com' 
      },
      campaign: {
        name: "Demo Campaign",
        source: "Hightouch Demo"
      }
    } : undefined; 
    

    htevents.track(eventName, properties, context);
   

  };
  
  const toggleConfig = (key) => {
    setEventConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="page home-page">
      <h2>Hightouch Browser SDK</h2>
      <p>Some visual aid on how the Browser SDK works</p>
      <p>Watch the even ttracker and click around</p>
     
      <div className="demo-section">
        <h3> Event Tracking</h3>
        <p>Configure your event and click the button to track it:</p>
        
        {/* Event Configuration Controls */}
        <div className="event-config-panel">
          <h4>Event Configuration</h4>
          <p>Toggle options to see different ways to track events:</p>
          
          <div className="config-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={eventConfig.useProperties} 
                onChange={() => toggleConfig('useProperties')} 
              />
              <span className="toggle-slider"></span>
            </label>
            <div className="config-description">
              <span className="config-label">Include Properties</span>
              <span className="config-hint">
                {eventConfig.useProperties 
                  ? "Including optional properties (location, button name)" 
                  : "No properties - tracking minimal event"}
              </span>
            </div>
          </div>
          
          <div className="config-option">
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={eventConfig.useContextOverrides} 
                onChange={() => toggleConfig('useContextOverrides')} 
              />
              <span className="toggle-slider"></span>
            </label>
            <div className="config-description">
              <span className="config-label">Override Context</span>
              <span className="config-hint">
                {eventConfig.useContextOverrides 
                  ? "Merging custom values with auto-collected context" 
                  : "Using only auto-collected context"}
              </span>
            </div>
          </div>
        </div>
       
        <div className="demo-container">
          <button
            onClick={handleButtonClick}
            className={`demo-button large-button ${isAnimating ? 'animate-click' : ''}`}
          >
            Track Event
          </button>
         
          {isAnimating && (
            <div className="event-animation">
              <div className="event-particle"></div>
              <div className="event-particle"></div>
              <div className="event-particle"></div>
              <div className="event-particle"></div>
              <div className="event-particle"></div>
            </div>
          )}
        </div>
       
        <div className="tracking-explanation">
          <h4>Event Structure:</h4>
          <div className="code-preview">
            <pre>
{`{
  "event": "Button Clicked",
  "type": "track",
  ${eventConfig.useProperties ? `"properties": {
    "location": "Home Page",
    "buttonName": "Welcome Button"
  },` : `"properties": {},`}
  "context": {
    ${eventConfig.useContextOverrides ? `"page": {
      "title": "Custom Page Title",
      "referrer": "https://example.com",
      ...
    },
    "campaign": {
      "name": "Demo Campaign",
      "source": "Hightouch Demo"
    },
    ...` : `// Auto-collected by SDK:
    "page": { /* page info */ },
    "userAgent": "...",
    "sessionId": "...",
    ...`}
  }
}`}
            </pre>
          </div>
          
          <div className="event-note">
            <h4>About Event Configuration:</h4>
            <p><strong>Properties</strong> are optional event-specific details. They can be anything relevant to the event.</p>
            <p><strong>Context</strong> is always auto-collected (browser info, page info, etc.), but you can selectively override or add specific fields.</p>
            <p>When providing context overrides, Hightouch <strong>merges</strong> your custom values with the auto-collected data rather than replacing everything.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;