/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
    // Add Flowbite paths:
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
   flowbite
  ],
}
