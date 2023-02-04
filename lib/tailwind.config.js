module.exports = {
  mode: 'jit',
  content: ['./client/**/*.{js,ts,jsx,tsx}', './themes/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2680eb',
      },
    },
  },
  variants: {},
  plugins: [],
}
