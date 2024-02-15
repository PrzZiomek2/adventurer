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
         colors: {
            dim: "#043427",
            dark: "#047857",
            medium: "#34D399",
            blend: "#5BE0AD",
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
         hd: "1536px",
         wide: "1800px",
      },
      fontSize: {
         sm: "0.8rem",
         base: "1rem",
         lg: "1.125rem",
         xl: "1.25rem",
         "2xl": "1.5rem",
         "3xl": "1.875rem",
         "4xl": "2.25rem",
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
