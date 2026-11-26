/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#718C56',
          50: '#F5F8F2',
          100: '#E8EFE2',
          200: '#D2DFC6',
          300: '#B4CCA0',
          400: '#94B478',
          500: '#718C56', // Primary Sage Green
          600: '#5A7144',
          700: '#465835',
          800: '#38462B',
          900: '#2F3A24',
        },
        walnut: {
          DEFAULT: '#4F3426',
          50: '#FBF8F6',
          100: '#F5EDE8',
          200: '#E8D8CF',
          300: '#D5BCAD',
          400: '#B78F78',
          500: '#8C624A',
          600: '#6D4834',
          700: '#4F3426', // Primary Walnut Brown
          800: '#3A251B',
          900: '#2A1A12',
        },
        amber: {
          DEFAULT: '#CA6B14',
          50: '#FEF8F2',
          100: '#FDF0E1',
          200: '#F9DEC2',
          300: '#F4C497',
          400: '#E49852',
          500: '#CA6B14', // Primary Amber Glow
          600: '#B0560D',
          700: '#8C3F0C',
          800: '#723410',
          900: '#5F2D11',
        },
        ivory: {
          DEFAULT: '#F3EBDD',
          light: '#FAF6F0',
          dark: '#EAE0CE',
        },
        beige: {
          DEFAULT: '#E8DDCC',
          light: '#F0E8DC',
          dark: '#DACDB7',
        },
        charcoal: {
          DEFAULT: '#292722',
          muted: '#5A564F',
          dark: '#1C1A16',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(79, 52, 38, 0.08)',
        'warm-md': '0 6px 20px -4px rgba(79, 52, 38, 0.12)',
        'warm-lg': '0 12px 32px -6px rgba(79, 52, 38, 0.15)',
        'warm-xl': '0 20px 48px -10px rgba(79, 52, 38, 0.20)',
      },
    },
  },
  plugins: [],
};

