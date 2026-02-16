/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#163A5F',
                accent: '#F47B20',
                bgLight: '#F5F7FA',
                bgContrast: '#0F2C4C',
            },
            fontFamily: {
                sans: ['Open Sans', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
