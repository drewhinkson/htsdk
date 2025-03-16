import React, { useState, useEffect } from 'react';

const EventLogger = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [animation, setAnimation] = useState(false);
  
  // Add animation when a new event is received
 
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Get event type icon
  const getEventIcon = (type) => {
    switch(type) {
      case 'page':
        return '📄';
      case 'track':
        return '🔔';
      case 'identify':
        return '👤';
      case 'reset':
        return '🔄';
      default:
        return '📝';
    }
  };
  
  // Get event color class
  const getEventClass = (type) => {
    switch(type) {
      case 'page':
        return 'event-page';
      case 'track':
        return 'event-track';
      case 'identify':
        return 'event-identify';
      case 'reset':
        return 'event-reset';
      default:
        return '';
    }
  };
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };
  
  const formatEventDetails = (event) => {
    switch(event.type) {
      case 'page':
        return `${event.category || ''} ${event.name || ''}`.trim() || 'Page View';
      case 'track':
        return event.name || 'Custom Event';
      case 'identify':
        return `User: ${event.userId}`;
      case 'reset':
        return 'Session Reset';
      default:
        return 'Unknown Event';
    }
  };
  
  const formatEventProperties = (event) => {
    if (!event.properties || Object.keys(event.properties).length === 0) {
      return null;
    }
    
    switch(event.type) {
      case 'page':
        return (
          <div className="event-props">
            <div className="event-properties-section">
              <h4>Page Details</h4>
              <table className="props-table">
                <tbody>
                  {event.properties.title && (
                    <tr>
                      <td>Title:</td>
                      <td>{event.properties.title}</td>
                    </tr>
                  )}
                  {event.properties.path && (
                    <tr>
                      <td>Path:</td>
                      <td>{event.properties.path}</td>
                    </tr>
                  )}
                  {event.properties.url && (
                    <tr>
                      <td>URL:</td>
                      <td>{event.properties.url}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'track':
        return (
          <div className="event-props">
            <div className="event-properties-section">
              <h4>Event Properties</h4>
              <table className="props-table">
                <tbody>
                  {Object.entries(event.properties).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}:</td>
                      <td>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      case 'identify':
        return (
          <div className="event-traits">
            <div className="event-properties-section">
              <h4>User Traits</h4>
              <table className="props-table">
                <tbody>
                  {Object.entries(event.traits).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}:</td>
                      <td>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const latestEvent = events.length > 0 ? events[events.length - 1] : null;

  return (
    <div className={`event-logger ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="event-logger-header" onClick={toggleExpand}>
        <h3>
          Latest Event
          {animation && <span className="pulse-indicator"></span>}
        </h3>
        <button className="toggle-btn">
          {isExpanded ? '▼' : '▲'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="event-list">
          {!latestEvent ? (
            <div className="no-events">
              <div className="no-events-icon">📊</div>
              <p>No events tracked yet. Interact with the app to see the latest event here.</p>
              <div className="no-events-hint">
              </div>
            </div>
          ) : (
            <div 
              className={`event-item ${getEventClass(latestEvent.type)} ${animation ? 'new-event' : ''}`}
            >
              <div className="event-icon" title={latestEvent.type}>{getEventIcon(latestEvent.type)}</div>
              <div className="event-content">
                <div className="event-title">
                  <span className="event-type">{latestEvent.type.toUpperCase()}</span>
                  <span className="event-name">{formatEventDetails(latestEvent)}</span>
                </div>
                <div className="event-time">{formatTime(latestEvent.timestamp)}</div>
                
                {formatEventProperties(latestEvent)}
              </div>
              {animation && <div className="event-highlight"></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventLogger;