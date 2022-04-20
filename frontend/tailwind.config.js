module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e6',
          100: '#fbdbb3',
          200: '#f8c480',
          300: '#f5ac4d',
          400: '#f2941a',
          500: '#F08800',
          600: '#d87a00',
          700: '#905200',
          800: '#784400',
        },
        main: '#111111',
        secondary: '#92938C'
      },
      fontFamily: {
        'body': ["Noto Sans"]
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },

      },
      animation: {
        'wiggle': 'wiggle 300ms ease-in-out ',
        'spin-slow': 'spin 7s linear infinite',
      },
    },
  },
  plugins: [],
}
// animation: {
//   'spin-slow': 'spin 7s linear infinite',
// }
// keyframes: {
//   wiggle: {
//     '0%, 100%': { transform: 'rotate(-3deg)' },
//     '50%': { transform: 'rotate(3deg)' },
//   }
// },
// animation: {
//   'wiggle': 'wiggle 1s ease-in-out infinite',
//   'spin-slow': 'spin 7s linear infinite',
// },
