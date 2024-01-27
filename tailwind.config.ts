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
            dim: "#064E3B",
            dark: "#047857",
            medium: "#34D399",
            light: "#6EE7B7",
         },
         borderRadius: {
            sm2: "0.2rem",
         },
         borderWidth: {
            3: "3px",
         },
      },
      screens: {
         sm: "576px",
         md: "768px",
         "2md": "900px",
         lg: "1024px",
         xl: "1280px",
         "2xl": "1536px",
      },
   },
   plugins: [],
};
export default config;
