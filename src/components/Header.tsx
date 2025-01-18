import React from 'react';
    import { useTheme } from '../ThemeProvider';

    const Header: React.FC = () => {
      const { isDark, toggleTheme } = useTheme();

      return (
        <header className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Modern UI</h1>
            <button onClick={toggleTheme}>
              Switch to {isDark ? 'Light' : 'Dark'} Theme
            </button>
          </div>
        </header>
      );
    };

    export default Header;
