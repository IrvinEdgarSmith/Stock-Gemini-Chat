export default {
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
      ],
      theme: {
        extend: {
          colors: {
            primary: '#6A1B9A',
            secondary: '#00BCD4',
            accent: '#E91E63',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#F8FAFC',
            'text-secondary': '#94A3B8',
            divider: '#334155',
          },
          animation: {
            'typing': 'typing 1.5s ease-in-out infinite',
          },
          keyframes: {
            typing: {
              '0%': { opacity: 0.5 },
              '50%': { opacity: 1 },
              '100%': { opacity: 0.5 },
            }
          }
        },
      },
      plugins: [],
    }
