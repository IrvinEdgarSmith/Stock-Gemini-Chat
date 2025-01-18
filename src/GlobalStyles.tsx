import React from 'react';
    import { createGlobalStyle } from 'styled-components';
    import { useTheme } from './ThemeProvider';

    const GlobalStyles = createGlobalStyle`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
          Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      a {
        color: ${({ theme }) => theme.primary};
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }

      button {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme.text};
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;

        &:hover {
          background-color: ${({ theme }) => theme.accent};
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .card {
        background-color: ${({ theme }) => theme.surface};
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `;

    export const GlobalStylesWrapper: React.FC = () => {
      const { theme } = useTheme();
      return <GlobalStyles theme={theme} />;
    };
