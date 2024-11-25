import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

export default {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				body: ['Roboto', 'sans-serif'],
				accent: ['Poppins', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				ink: '#1d1d1f',
				canvas: '#fff',
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('header-open', 'body:has(#header-open:checked) &')
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')
		}),
		require('daisyui'),
	],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#A4B494', // Sage
					'primary-content': '#34252F', // Raisin Black

					secondary: '#BEC5AD', // Ash Gray
					'secondary-content': '#34252F', // Raisin Black

					accent: '#519872', // Sea Green
					'accent-content': '#FFFFFF', // White for high contrast

					neutral: '#474A48', // Outer Space
					'neutral-content': '#FFFFFF', // White for readability

					'base-100': '#FFFFFF', // White for primary backgrounds
					'base-200': '#C8D6AF', // Tea Green for secondary backgrounds
					'base-300': '#BEC5AD', // Ash Gray for tertiary backgrounds
					'base-content': '#34252F', // Raisin Black for text

					info: '#90A8C3', // Powder Blue for info states
					success: '#519872', // Sea Green for success
					warning: '#ECF39E', // Mindaro for warnings
					error: '#CD8B76', // Old Rose for errors
				},
				dark: {
					primary: '#519872', // Sea Green
					'primary-content': '#C8D6AF', // Tea Green

					secondary: '#474A48', // Outer Space
					'secondary-content': '#C8D6AF', // Tea Green

					accent: '#ECF39E', // Mindaro
					'accent-content': '#34252F', // Raisin Black for high contrast

					neutral: '#34252F', // Raisin Black
					'neutral-content': '#C8D6AF', // Tea Green for readability

					'base-100': '#34252F', // Raisin Black for primary backgrounds
					'base-200': '#474A48', // Outer Space for secondary backgrounds
					'base-300': '#334E58', // Charcoal for tertiary backgrounds
					'base-content': '#C8D6AF', // Tea Green for text

					info: '#90A8C3', // Powder Blue for info states
					success: '#519872', // Sea Green for success
					warning: '#ECF39E', // Mindaro for warnings
					error: '#CD8B76', // Old Rose for errors
				},
			},
		],
		darkTheme: 'dark', // Set the dark mode theme
		base: true,
	},
	safelist: [{ pattern: /action.*/ }, 'ghost'],
} satisfies Config
