module.exports = {
  mode: 'jit',
  purge: ["./src/app/**/*.{ts,html}"],
  // darkMode: true, // or 'media' or 'class',
  darkMode: ['class', 'theme-dark'],
  // content: [
  //   "./src/**/*.{html,ts}",
  // ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f00',
          50 : '#ffe0e0',
          100 : '#ffb3b3',
          200 : '#ff8080',
          300 : '#ff4d4d',
          400 : '#ff2626',
          500 : '#ff0000',
          600 : '#ff0000',
          700 : '#ff0000',
          800 : '#ff0000',
          900 : '#ff0000',
          A100 : '#ffffff',
          A200 : '#fff2f2',
          A400 : '#ffbfbf',
          A700 : '#ffa6a6',
        },
        success: '#02A707',
        warning: '#FFA800'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
