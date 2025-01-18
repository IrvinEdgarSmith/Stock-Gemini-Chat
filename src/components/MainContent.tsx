import React from 'react';

    const MainContent: React.FC = () => {
      return (
        <div className="card">
          <h2>Welcome to the Modern UI</h2>
          <p>This is a demonstration of a modern, accessible UI with theme switching capabilities.</p>
          <div style={{ marginTop: '2rem' }}>
            <button>Primary Action</button>
            <button style={{ marginLeft: '1rem', backgroundColor: '#00BCD4' }}>Secondary Action</button>
          </div>
        </div>
      );
    };

    export default MainContent;
