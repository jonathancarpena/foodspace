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
        secondary: '#666665'
      },
      fontFamily: {
        'body': ["Noto Sans"]
      },
    },
  },
  plugins: [],
}
