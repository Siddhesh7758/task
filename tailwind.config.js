/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderColor: {
        'custom-gray': '#ECECEC',
      },
      colors: {
        gainsboro: { "100": "#e1e3e6", "200": "#e1e1e1" },
        white: "#fff",
        green: "#60d09b",
        whitesmoke: "#ececec",
        darkslategray: { "100": "#343434", "200": "rgba(52, 52, 52, 0.51)" },
        gray: "rgba(0, 0, 0, 0.02)",
        lavender: {
          "100": "rgba(237, 226, 254, 0)",
          "200": "rgba(210, 223, 252, 0)",
        },
        moccasin: "rgba(255, 234, 182, 0)",
        lightcyan: "rgba(208, 240, 253, 0)",
        mistyrose: {
          "100": "rgba(254, 226, 213, 0)",
          "200": "rgba(255, 220, 229, 0)",
        },
        royalblue: "#457df1",
        black: "#232323",
      },
      fontFamily: { "campton-book": "Campton-Book", campton: "Campton" },
      borderRadius: { "2xs": "11px" },
    },
    fontSize: { base: "16px" },
  },
  corePlugins: { preflight: false },
};
