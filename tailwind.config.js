/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        "h1-desktop": [
          "64px",
          { lineHeight: "64px", letterSpacing: "-0.25px", fontWeight: "700" },
        ],
        "h2-desktop": [
          "45px",
          { lineHeight: "52px", letterSpacing: "0px", fontWeight: "700" },
        ],
        "h3-desktop": [
          "36px",
          { lineHeight: "44px", letterSpacing: "0px", fontWeight: "700" },
        ],

        "h1-mobile": [
          "48px",
          { lineHeight: "40px", letterSpacing: "0", fontWeight: "700" },
        ],
        "h2-mobile": [
          "28px",
          { lineHeight: "36px", letterSpacing: "0", fontWeight: "700" },
        ],
        "h3-mobile": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0", fontWeight: "700" },
        ],
        "p-desktop": [
          "16px",
          { lineHeight: "24px", letterSpacing: "+0.15px", fontWeight: "500" },
        ],
        "p-mobile": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0.25px", fontWeight: "500" },
        ],
        "lg-desktop": [
          "22px",
          { lineHeight: "28px", letterSpacing: "0", fontWeight: "700" },
        ],
        "lg-mobile": [
          "14px",
          { lineHeight: "24px", letterSpacing: "+0.5px", fontWeight: "700" },
        ],
      },
      colors: {
        black: "#0C0404",
        darkcream: "#EFD7C5",
        cream: "#F4EEE8",
        green: "#0C4C4C",
        orange: "#DE7055",

        greyborder: "#AAAAAA",
        greyborder: "#C9C9C9",

        success: "#43BF35",
        error: "#BF0835",
        warning: "#F4AD43",
        disabled: "#79747E",
      },
    },
  },
  plugins: [],
};
