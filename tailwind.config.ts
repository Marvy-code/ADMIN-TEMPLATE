import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo:["Oleo Script", "system-ui"],
        primary: ["Inter", "sans-serif"],
        century: ['Century Gothic', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config;
