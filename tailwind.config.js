/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        body:"Roboto_400Regular",
        heading:"Roboto_700Bold"
      }
    },
  },
  plugins: [],
}

