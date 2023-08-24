import { Config } from "tailwindcss"
import animateTailwind from "tailwindcss-animate"
import { shadcnPlugin } from "./src/lib/shaddn";

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  plugins: [
    animateTailwind, 
    shadcnPlugin, 
    require('tailwind-scrollbar-hide')
  ],
} satisfies Config;

export default config; 