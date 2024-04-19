/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.5625rem",
        sm: "0.6875rem",
        md: "0.875rem",
        xl: "1.1875rem",
        h6: "1.375rem",
        h5: "1.6875rem",
        h4: "2.125rem",
        h3: "2.6875rem",
        h2: "3.3125rem",
        h1: "4.1875rem",
      },
      colors: {
        mainColor: "#ff9ae6",
        pinkish: "#EB80D9",
      },
    },
    fontFamily: {
      sans: ['"PT Sans"', "sans-serif"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
