/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#36e27b",
                "primary-hover": "#2dc66b",
                "background-light": "#f6f8f7",
                "background-dark": "#112117",
                "card-bg": "#1a2c22",
                "border-green": "#2d4a39",
                "brand-blue": "#005595",
                "brand-red": "#E31D2B",
            },
            fontFamily: {
                display: ["Spline Sans", "sans-serif"],
            },
            backgroundImage: {
                'ept-slash': 'linear-gradient(135deg, transparent 40%, #005595 40%, #005595 60%, #E31D2B 60%, #E31D2B 100%)',
                'ept-overlay': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03) 10px, transparent 10px, transparent 20px)',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/container-queries'),
    ],
};
