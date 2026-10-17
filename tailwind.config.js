/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E6EDE7',
          200: '#CFDDCF',
          300: '#ADC4AE',
          400: '#7FA381',
          500: '#5A855D',
          600: '#4B7C59', // Brand core sage
          700: '#3A6044',
          800: '#2F4D37',
          900: '#263F2E',
          950: '#142218'
        },
        sand: {
          50: '#FDFBF7',
          100: '#F9F6F0', // Soft Sand
          200: '#F3EFE6', // Stone Cream
          300: '#E7E0D3',
          400: '#D5CABB',
          500: '#B8A895',
          600: '#948370',
          700: '#756555',
          800: '#5F5144',
          900: '#4F433A'
        },
        terracotta: {
          50: '#FDF6F3',
          100: '#FBEBE5',
          200: '#F7D6CB',
          300: '#F0B7A5',
          400: '#E58F76',
          500: '#D97757', // Muted Terracotta
          600: '#C25D3D',
          700: '#A1492E',
          800: '#833E29',
          900: '#6C3626'
        },
        coin: {
          happy: '#E9B949',   // Sunny Gold
          calm: '#6BA4B8',    // Soft Sky
          growth: '#9B72CF'   // Gentle Amethyst
        },
        darkbg: {
          base: '#131815',
          surface: '#1A221E',
          card: '#222D27',
          border: '#2C3A33'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Merriweather', 'serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(47, 77, 55, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(47, 77, 55, 0.12)',
        'soft-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [],
}
