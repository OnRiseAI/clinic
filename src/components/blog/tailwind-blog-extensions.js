// Add these to your existing tailwind.config.js/ts under theme.extend

/** @type {import('tailwindcss').Config} */
const blogTailwindExtensions = {
  colors: {
    blog: {
      navy: "#0f1b2d",
      teal: {
        DEFAULT: "#0d9488",
        dark: "#0f766e",
        light: "#14b8a6",
      },
      warm: {
        bg: "#faf9f7",
        border: "#eae6e1",
      },
      text: {
        primary: "#1a1a1a",
        body: "#5c5650",
        muted: "#9a9590",
      },
      green: {
        bg: "#f0fdfa",
        border: "#ccfbf1",
      },
    },
  },
  fontFamily: {
    "blog-serif": ['"Source Serif 4"', "Georgia", "serif"],
    "blog-sans": ['"DM Sans"', "system-ui", "sans-serif"],
  },
  keyframes: {
    "blog-hero-grad": {
      "0%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      "100%": { backgroundPosition: "0% 50%" },
    },
  },
  animation: {
    "blog-hero-grad": "blog-hero-grad 14s ease infinite",
  },
};

module.exports = blogTailwindExtensions;
