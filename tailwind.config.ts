import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   purge: ["./app/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         boxShadow: {
            item: "0 0 5px #047857",
            "item-bolder": "1px 1px 7px #047857",
            highlight: "12px 13px 18px #047857",
         },
         colors: {
            dim: "#043427",
            darken: "#064e3b",
            dark: "#065f46", // "#047857",
            medium: "#34D399",
            blend: "#64E4B2",
            light: "#6EE7B7",
            lighted: "#A7F3D0",
            alert: "#9b1717",
         },
         borderRadius: {
            sm2: "0.2rem",
         },
         borderWidth: {
            3: "3px",
         },
         opacity: {
            40: ".4",
         },
         brightness: {
            75: ".75",
            85: ".85",
         },
         textUnderlineOffset: {
            9: "9px",
            10: "10px",
         },
      },
      screens: {
         sm: "576px",
         md: "768px",
         "2md": "900px",
         lg: "1024px",
         desktop: "1200px",
         desktop2: "1300px",
         hd: "1536px",
         wide: "1800px",
      },
      fontSize: {
         xs: "12px",
         sm: "14px",
         base: "16px",
         lg: "18px",
         xl: "20px",
         "2xl": "24px",
         "3xl": "30px",
         "4xl": "36px",
      },
      gap: {
         1: "0.25rem",
         2: "0.5rem",
         3: "0.75rem",
         4: "1rem",
         5: "1.25rem",
         6: "1.5rem",
         7: "1.75rem",
         8: "2rem",
         9: "2.25rem",
         10: "2.5rem",
      },
   },
   plugins: [],
};
export default config;
