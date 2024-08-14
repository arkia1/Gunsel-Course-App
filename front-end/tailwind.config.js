/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lmd: "1000px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
    extend: {
      scrollbar: ["rounded"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-none": {
          "scrollbar-width": "none" /* For Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* For Chrome, Safari, and Edge */,
          },
        },
      });
    },
  ],
};
