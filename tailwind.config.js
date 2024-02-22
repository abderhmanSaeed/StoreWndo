module.exports = {
  mode: "jit",
  purge: ["./src/app/**/*.{ts,html}"],
  // darkMode: true, // or 'media' or 'class',
  darkMode: ["class", "theme-dark"],
  // content: [
  //   "./src/**/*.{html,ts}",
  // ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f00",
          50: "#ffe0e0",
          100: "#ffb3b3",
          200: "#ff8080",
          300: "#ff4d4d",
          350: "#fe4b46",
          400: "#ff2626",
          500: "#ff0000",
          600: "#ff0000",
          700: "#ff0000",
          800: "#ff0000",
          900: "#ff0000",
          950: "#FF002A",
          A100: "#ffffff",
          A200: "#fff2f2",
          A400: "#ffbfbf",
          A700: "#ffa6a6",
        },
        success: "#02A707",
        warning: "#FFA800",
        gray: {
          50: "#fafafa",
          60: "#BFBFBF",
          100: "#F8F8F8",
          150: "#FFF5F5",
          200: "#EFEFEF",
          300: "#F9F9F9",
          350: "#C8CACB",
          400: "#D9D9D9",
          900: "#101010",
        },
        purple: {
          500: "#4C4C75",
        },
        blue: {
          200: "#1d85ec",
          500: "#0d1863",
          700: "#04043f",
        },
        blueGray: {
          100: "#AAB2B7",
          200: "#969EB2",
          300: "#96A1AB",
          400: "#9599B3",
        },
      },
      spacing: {
        4.5: "1.125rem",
      },
      leading: {
        0: 0,
      },
      height: {
        3.8: "14.375rem",
      },
      screens: {
        tablet: "990px",

        portrait: {
          raw: "(orientation: portrait)",
        },

        landscape: {
          raw: "(orientation: landscape)",
        },
      },
      width: {
        fit: "fit-content",
      },
      flex: {
       0 : "1 0 0%"
      }
    },
  },
  variants: {
    extend: { lineClamp: ["responsive", "hover"] },
  },
  plugins: [require("tailwindcss-rtl"), require("@tailwindcss/line-clamp")],
};
