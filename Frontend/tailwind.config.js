/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBlue: "#32E0C4",
                lightBlue: "#EEEEEE",
                darkBlue: "#0D7377",
                dark: "#212121",
                white: "#ffffff",
                bgShade: "#F9FCFF",
                verifyGreen: "#6FBC9A",
                textGray: "#b2b2b2",
                bgGray: "#f2f3f3",
            },
        },
    },
    plugins: [],
};
