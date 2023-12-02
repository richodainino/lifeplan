/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/views/**/*.ejs"],
  safelist: [
    {
      pattern: /alert-(warning|success|error|info)/,
    }
  ],
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