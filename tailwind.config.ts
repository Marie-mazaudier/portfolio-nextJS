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
        "motif-bg": "url('/images/motif_bg.svg')", // Chemin depuis le dossier public
        "motif-bg-red": "url('/images/motif_bg-red.svg')",
        "motif-bg-red-2": "url('/images/Backgroung_motif-2.svg')",
        "motif-bg-red-3": "url('/images/Backgroung_motif-3.svg')",
        "motif-bg-noir": "url('/images/motif-noir.png')",
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
      },
      fontFamily: {
        textThin: ["var(--thin-font)", "sans-serif"],
        textMedium: ["var(--medium-font)", "sans-serif"],
        textSemibold: ["var(--semi-bold-font)", "sans-serif"],
        textRegular: ["var(--regular-font)", "sans-serif"],
        textBold: ["var(--bold-font)", "sans-serif"],
      },
      fontSize: {
        xs: ["0.85rem", "1rem"], // font size - line height
        sm: ["0.95rem", "1.5rem"],
        md: ["1rem", "1.5rem"],
        nav: ["1rem", "1.75rem"],
        item: ["1.2rem", "1.5rem"],
        med: ["1.7rem", "1.2em"],
        lg: ["2.2rem", "1.5em"],
        xl: ["2.5vw", "2rem"],
        xxl: ["4.3vw", "1.2em"],
        xxxl: ["8.3vw", "1.2em"],
        "4xl": ["12.3vw", "1.2em"],
        h2: ["5vw", "1.3em"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1025px", // Taille large
        xl: "1280px",
        "2xl": "1550px",
      },
    },
  },
  plugins: [],
};
