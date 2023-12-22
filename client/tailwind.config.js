/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        
        primary: "#228BE6",
        secondary: "#4DABF7",
        reddish: "#FF3F40",
      },
      backgroundImage: {
        btnColor:
          "linear-gradient(91.34deg, #6DB661 10.62%, #24906D 50.16%, #279D5A 100.49%)",
      },

      fontFamily: {
        fontPop: ["Poppins"],
      },
      display: ["active"],
      fontSize: {
        stand: "16px",
        title: "32px",
        bigger: "44px",
      },
      boxShadow: {
        card: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
        book: "-3px 0px 46px 3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)",
        reserve:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
      },
    },
  },
  plugins: [],
};
