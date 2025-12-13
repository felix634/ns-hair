/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				ns: {
					black: '#1a1a1a', // Sötétszürke háttér
					silver: '#e0e0e0', // Ezüstös szöveg
					red: '#D32F2F',    // A logóban lévő piros akcentus
				}
			},
			fontFamily: {
				sans: ['Helvetica', 'Arial', 'sans-serif'],
			}
		},
	},
	plugins: [],
}