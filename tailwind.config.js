/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        todoItem: "0px 0px 10px 0px #00000026",
      },
    },
  },
  plugins: [],
};
