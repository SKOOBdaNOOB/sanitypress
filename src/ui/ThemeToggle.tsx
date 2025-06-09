'use client'

import { useState, useEffect } from 'react'
import {
	VscCircuitBoard,
	VscTerminal,
	VscShield,
	VscCode,
} from 'react-icons/vsc'

type ThemeVariant = 'default' | 'matrix' | 'security' | 'code'

const themes: Record<
	ThemeVariant,
	{
		name: string
		icon: React.ComponentType<{ className?: string }>
		primary: string
	}
> = {
	default: { name: 'Cyber', icon: VscCircuitBoard, primary: '#00d4ff' },
	matrix: { name: 'Matrix', icon: VscTerminal, primary: '#00ff88' },
	security: { name: 'Security', icon: VscShield, primary: '#ff6b35' },
	code: { name: 'Code', icon: VscCode, primary: '#8b5cf6' },
}

export default function ThemeToggle({
	className = '',
}: {
	className?: string
}) {
	const [currentTheme, setCurrentTheme] = useState<ThemeVariant>('default')
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
		// Load saved theme or default to 'default'
		const savedTheme = localStorage.getItem('theme-variant') as ThemeVariant
		if (savedTheme && themes[savedTheme]) {
			setCurrentTheme(savedTheme)
			applyTheme(savedTheme)
		}
	}, [])

	const applyTheme = (theme: ThemeVariant) => {
		const root = document.documentElement
		const themeConfig = themes[theme]

		// Update CSS custom properties
		root.style.setProperty('--color-accent-primary', themeConfig.primary)
		root.style.setProperty('--color-accent', themeConfig.primary)

		// Adjust hover variants
		const hoverColor = adjustColorBrightness(themeConfig.primary, -20)
		root.style.setProperty('--color-accent-primary-hover', hoverColor)
	}

	const adjustColorBrightness = (hex: string, percent: number): string => {
		// Simple brightness adjustment for hover states
		const num = parseInt(hex.replace('#', ''), 16)
		const amt = Math.round(2.55 * percent)
		const R = (num >> 16) + amt
		const G = ((num >> 8) & 0x00ff) + amt
		const B = (num & 0x0000ff) + amt
		return (
			'#' +
			(
				0x1000000 +
				(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
				(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
				(B < 255 ? (B < 1 ? 0 : B) : 255)
			)
				.toString(16)
				.slice(1)
		)
	}

	const cycleTheme = () => {
		const themeKeys = Object.keys(themes) as ThemeVariant[]
		const currentIndex = themeKeys.indexOf(currentTheme)
		const nextIndex = (currentIndex + 1) % themeKeys.length
		const nextTheme = themeKeys[nextIndex]

		setCurrentTheme(nextTheme)
		applyTheme(nextTheme)
		localStorage.setItem('theme-variant', nextTheme)
	}

	if (!isClient) {
		return (
			<div className={`flex items-center gap-3 ${className}`}>
				<div className="technical text-ink-subtle">THEME</div>
				<div className="skeleton h-8 w-20 rounded"></div>
			</div>
		)
	}

	const currentThemeConfig = themes[currentTheme]

	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<div className="technical text-ink-subtle">THEME</div>
			<button
				onClick={cycleTheme}
				className="group border-surface-elevated bg-surface hover:border-accent-primary hover:bg-surface-elevated flex items-center gap-2 rounded-md border px-3 py-2 transition-all duration-200"
				aria-label={`Current theme: ${currentThemeConfig.name}. Click to cycle themes.`}
			>
				<currentThemeConfig.icon className="text-accent-primary h-4 w-4 transition-colors" />
				<span className="terminal-text text-ink text-sm font-medium">
					{currentThemeConfig.name}
				</span>
				<div className="ml-1 flex h-2 w-2 items-center justify-center">
					<div
						className="h-2 w-2 rounded-full transition-all duration-200 group-hover:scale-110"
						style={{ backgroundColor: currentThemeConfig.primary }}
					/>
				</div>
			</button>
		</div>
	)
}
