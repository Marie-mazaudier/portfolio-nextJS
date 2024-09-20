/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Assurez-vous que ce chemin est inclus
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
      fontFamily: {
        thin: ["var(--thin-font)", "sans-serif"],
        regular: ["var(--regular-font)", "sans-serif"],
        medium: ["var(--medium-font)", "sans-serif"],
        semibold: ["var(--semi-bold-font)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", "1rem"], // font size - line height
        sm: ["0.95rem", "1.5rem"],
        md: ["1rem", "1.5rem"],
        nav: ["1.3rem", "1.75rem"],
        med: ["1.7rem", "1.2em"],
        lg: ["2.2rem", "1.5em"],
        xl: ["3vw", "2rem"],
        xxl: ["4.3vw", "1.2em"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px", // Taille large
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
