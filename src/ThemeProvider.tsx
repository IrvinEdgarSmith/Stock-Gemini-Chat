import React, { createContext, useContext, useState } from 'react';
    import { darkTheme, lightTheme } from './theme';

    type ThemeContextType = {
      isDark: boolean;
      theme: typeof darkTheme;
      toggleTheme: () => void;
    };

    const ThemeContext = createContext<ThemeContextType>({
      isDark: true,
      theme: darkTheme,
      toggleTheme: () => {},
    });

    export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [isDark, setIsDark] = useState(true);
      
      const toggleTheme = () => {
        setIsDark(!isDark);
      };

      return (
        <ThemeContext.Provider value={{
          isDark,
          theme: isDark ? darkTheme : lightTheme,
          toggleTheme,
        }}>
          {children}
        </ThemeContext.Provider>
      );
    };

    export const useTheme = () => useContext(ThemeContext);
