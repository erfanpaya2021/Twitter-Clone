/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            textColor: {
                primary: "var(--primary-color)",
                secondary: "var(--secondary-color)",
                darkGray: "var(--dark-gray-color)",
                lightGray: "var(--light-gray-color)",
                extraLightGray: "var(--extra-light-gray-color)",
            },
            backgroundColor: {
                primary: "var(--primary-color)",
                secondary: "var(--secondary-color)",
                darkGray: "var(--dark-gray-color)",
                lightGray: "var(--light-gray-color)",
                extraLightGray: "var(--extra-light-gray-color)",
            },
        },
        fontSize: {
            sm: "var(--font-size-sm)",
            base: "var(--font-size-base)",
            md: "var(--font-size-md)",
            lg: "var(--font-size-lg)",
            xl: "var(--font-size-xl)",
            "2xl": "var(--font-size-xxl)",
            "3xl": "var(--font-size-xxxl)",
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
