import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import Image from './RichtextModule/Image'
import Code from './RichtextModule/Code'
import CustomHTML from './CustomHTML'
import { cn } from '@/lib/utils'

export default function AccordionList({
	pretitle,
	intro,
	items,
	layout = 'vertical',
	connect,
	generateSchema,
	...props
}: Partial<{
	pretitle: string
	intro: any
	items: {
		summary: string
		content: any
		open?: boolean
	}[]
	layout: 'vertical' | 'horizontal'
	connect: boolean
	generateSchema: boolean
}> &
	Sanity.Module) {
	return (
		<section
			className={cn(
				'section relative',
				layout === 'horizontal' ? 'grid gap-12 md:grid-cols-2' : 'space-y-12',
			)}
			{...(generateSchema && {
				itemScope: true,
				itemType: 'https://schema.org/FAQPage',
			})}
			{...moduleProps(props)}
		>
			{/* Terminal Documentation Header */}
			<div className="terminal-window">
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="terminal-dot bg-red-500"></div>
						<div className="terminal-dot bg-yellow-500"></div>
						<div className="terminal-dot bg-green-500"></div>
					</div>
					<div className="terminal-title">DOCUMENTATION</div>
				</div>
				<div className="terminal-content">
					<div className="status-indicator mb-4">
						<span className="technical">DOCS STATUS: READY</span>
						<span className="text-accent-matrix ml-4">●</span>
					</div>
					<div className="text-ink-muted font-mono text-xs">
						<span className="text-accent-cyber">$</span> man accordion
						--expand-all
					</div>
				</div>
			</div>

			<header
				className={cn(
					'richtext space-y-6',
					layout === 'horizontal'
						? 'md:sticky-below-header self-start [--offset:1rem]'
						: 'text-center',
				)}
			>
				<Pretitle>{pretitle}</Pretitle>
				<div className="text-gradient-cyber">
					<PortableText value={intro} />
				</div>
			</header>

			<div className="mx-auto w-full max-w-screen-md space-y-4">
				{items?.map(({ summary, content, open }, key) => (
					<details
						className="group border-surface-elevated bg-surface/30 hover:border-accent-cyber hover:bg-surface/50 hover:shadow-accent-cyber/20 overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg"
						name={connect ? props._key : undefined}
						open={open}
						{...(generateSchema && {
							itemScope: true,
							itemProp: 'mainEntity',
							itemType: 'https://schema.org/Question',
						})}
						key={key}
					>
						<summary
							className="hover:bg-surface/50 flex cursor-pointer items-center justify-between p-6 font-mono font-semibold transition-colors"
							{...(generateSchema && { itemProp: 'name' })}
						>
							<div className="flex items-center gap-3">
								<div className="status-indicator">
									<span className="technical text-xs">
										DOC_{String(key + 1).padStart(2, '0')}
									</span>
									<span className="text-accent-matrix ml-2">●</span>
								</div>
								<span className="text-accent-cyber">{summary}</span>
							</div>

							<div className="flex items-center gap-2">
								<span className="text-ink-muted group-open:text-accent-matrix font-mono text-xs">
									[EXPAND]
								</span>
								<div className="h-4 w-4 transition-transform duration-300 group-open:rotate-90">
									<div className="border-accent-cyber h-full w-full rotate-45 transform border-t-2 border-l-2"></div>
								</div>
							</div>
						</summary>

						<div
							className="anim-fade-to-b border-surface-elevated bg-surface/20 border-t p-6"
							{...(generateSchema && {
								itemScope: true,
								itemProp: 'acceptedAnswer',
								itemType: 'https://schema.org/Answer',
							})}
						>
							{/* Content Header */}
							<div className="mb-4 flex items-center gap-2">
								<div className="bg-accent-matrix h-1.5 w-1.5 animate-pulse rounded-full"></div>
								<span className="text-ink-muted font-mono text-xs">
									CONTENT LOADED
								</span>
							</div>

							<div
								className="richtext space-y-4"
								{...(generateSchema && {
									itemProp: 'text',
								})}
							>
								<PortableText
									value={content}
									components={{
										types: {
											image: Image,
											code: Code,
											'custom-html': ({ value }) => (
												<CustomHTML
													className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto"
													{...value}
												/>
											),
										},
									}}
								/>
							</div>

							{/* Content Footer */}
							<div className="border-surface-elevated/50 mt-6 border-t pt-4">
								<div className="flex items-center justify-between">
									<span className="text-ink-muted font-mono text-xs">
										END OF SECTION
									</span>
									<div className="flex gap-1">
										<div className="bg-accent-cyber/60 h-1 w-1 rounded-full"></div>
										<div className="bg-accent-matrix/60 h-1 w-1 rounded-full"></div>
										<div className="bg-accent-devops/60 h-1 w-1 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Hover Effect */}
						<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="from-accent-cyber/5 to-accent-matrix/5 absolute inset-0 bg-gradient-to-br via-transparent"></div>
							<div className="scan-lines"></div>
						</div>
					</details>
				))}
			</div>
		</section>
	)
}
