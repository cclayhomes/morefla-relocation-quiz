import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lagoon: '#2A6A8B',
        citrus: '#F29B30',
        sand: '#F5EFE6',
        palm: '#2F7D32'
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(10, 28, 38, 0.45)'
      }
    }
  },
  plugins: []
} satisfies Config;
