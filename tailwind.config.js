/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  daisyui: {
    themes: [
      {
        lifeplan: {
          "primary": "#25995c",
          "secondary": "#ffde59",
          "accent": "#0cc0df",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}