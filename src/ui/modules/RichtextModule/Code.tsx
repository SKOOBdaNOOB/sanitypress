import { codeToHtml, splitLines, bundledThemes } from 'shiki'
import ClickToCopy from '@/ui/ClickToCopy'
import css from './Code.module.css'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default async function Code({
	value,
	theme = 'github-dark',
	className,
}: {
	theme?: keyof typeof bundledThemes
	value?: Sanity.Code
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	const [path, filename] = value.filename?.includes('/')
		? value.filename.split(/(.*)\/(.*)$/).filter(Boolean)
		: [, value.filename]

	return (
		<article
			className={cn('group relative overflow-hidden', className)}
			data-module="code"
		>
			{/* Simplified Code Block Header */}
			{(value.filename || value.language) && (
				<div className="flex items-center justify-between border-b border-[var(--color-terminal-border)] bg-[var(--color-surface-elevated)] px-4 py-2 text-sm">
					{/* File Path */}
					{value.filename && (
						<div className="flex items-center gap-1 font-mono">
							<span className="text-ink-subtle">~/</span>
							{path && <span className="text-ink-subtle">{path}/</span>}
							<span className="text-accent-code font-semibold">{filename}</span>
						</div>
					)}

					{/* Language Badge */}
					{value.language && (
						<div className="text-accent-code rounded border border-[var(--color-terminal-border)] bg-[var(--color-terminal-bg)] px-2 py-1 font-mono text-xs">
							{value.language}
						</div>
					)}
				</div>
			)}

			{/* Code Content Area */}
			<div className="relative">
				{/* Copy Button */}
				<div className="absolute top-3 right-3 z-20">
					<ClickToCopy
						value={stegaClean(value.code)}
						className={cn(
							'action-outline px-3 py-1.5 text-xs',
							'opacity-0 transition-all duration-200 group-hover:opacity-100',
							'hover:bg-accent-primary hover:text-canvas hover:border-accent-primary',
							'shadow-lg backdrop-blur-sm',
							'[&.pointer-events-none]:opacity-100',
						)}
					/>
				</div>

				{/* Code Content */}
				<div
					className={cn(
						css.code,
						'font-mono text-sm leading-relaxed',
						'[--highlight-color:var(--color-accent-success)]',
						'relative z-10',
					)}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</article>
	)
}
