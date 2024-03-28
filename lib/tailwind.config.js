const colors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
const weights = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

module.exports = {
  content: ['./client/**/*.{js,ts,jsx,tsx,html}', './themes/**/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#2680eb',
      },
    },
  },
  safelist: [
    { pattern: new RegExp(`bg-(${colors.join('|')})-(${weights.join('|')})$`) },
    { pattern: new RegExp(`text-(${colors.join('|')})-(${weights.join('|')})$`) },
  ],
  variants: {},
  plugins: [],
}
