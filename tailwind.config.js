/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0f172a',
                primary: '#38bdf8',
                card: '#1e293b',
                text: '#f8fafc',
            },
        },
    },
    plugins: [],
}