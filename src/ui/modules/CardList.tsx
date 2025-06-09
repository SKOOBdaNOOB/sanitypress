import moduleProps from '@/lib/moduleProps'
import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import { Img } from '@/ui/Img'
import { cn } from '@/lib/utils'

export default function CardList({
	pretitle,
	intro,
	cards,
	ctas,
	layout,
	columns = 3,
	visualSeparation,
	...props
}: Partial<{
	pretitle: string
	intro: any
	ctas: Sanity.CTA[]
	cards: Partial<{
		image: Sanity.Image
		content: any
		ctas: Sanity.CTA[]
	}>[]
	layout: 'grid' | 'carousel'
	columns: number
	visualSeparation: boolean
}> &
	Sanity.Module) {
	const isCarousel = stegaClean(layout) === 'carousel'

	return (
		<section className="section relative space-y-12" {...moduleProps(props)}>
			{/* Terminal Header */}
			<div className="terminal-window">
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="terminal-dot bg-red-500"></div>
						<div className="terminal-dot bg-yellow-500"></div>
						<div className="terminal-dot bg-green-500"></div>
					</div>
					<div className="terminal-title">CARD_LIST_MODULE</div>
				</div>
				<div className="terminal-content">
					<div className="status-indicator mb-4">
						<span className="technical">MODULE STATUS: ACTIVE</span>
						<span className="text-accent-matrix ml-4">●</span>
					</div>
				</div>
			</div>

			{(pretitle || intro) && (
				<header className="richtext space-y-6 text-center">
					<Pretitle>{pretitle}</Pretitle>
					<div className="text-gradient-cyber">
						<PortableText value={intro} />
					</div>
					<CTAList className="justify-center" ctas={ctas} />
				</header>
			)}

			<div
				className={cn(
					'items-stretch gap-8',
					isCarousel
						? 'carousel max-md:full-bleed md:overflow-fade-r pb-4 max-md:px-4'
						: [
								'grid *:h-full max-md:pb-4',
								columns
									? 'md:grid-cols-[repeat(var(--col,3),minmax(0,1fr))]'
									: 'sm:grid-cols-[repeat(auto-fill,minmax(var(--size,300px),1fr))]',
							],
				)}
				style={
					columns
						? ({
								'--col': columns,
							} as React.CSSProperties)
						: undefined
				}
			>
				{cards?.map((card, key) => (
					<article
						className={cn(
							'group border-surface-elevated bg-surface/50 hover:border-accent-cyber hover:bg-surface/80 hover:shadow-accent-cyber/20 relative flex flex-col gap-4 overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:shadow-lg',
							visualSeparation && 'border-accent-cyber/30',
						)}
						key={key}
					>
						{/* Card Header */}
						<div className="flex items-center justify-between">
							<div className="status-indicator">
								<span className="technical text-xs">
									CARD_{String(key + 1).padStart(2, '0')}
								</span>
								<span className="text-accent-matrix ml-2">●</span>
							</div>
							<div className="flex gap-1">
								<div className="bg-accent-cyber/60 h-2 w-2 rounded-full"></div>
								<div className="bg-accent-matrix/60 h-2 w-2 rounded-full"></div>
								<div className="bg-accent-security/60 h-2 w-2 rounded-full"></div>
							</div>
						</div>

						{card.image && (
							<figure className="border-surface-elevated relative overflow-hidden rounded border">
								<Img
									className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
									image={card.image}
									width={600}
								/>
								<div className="from-surface/20 absolute inset-0 bg-gradient-to-t to-transparent"></div>
							</figure>
						)}

						<div className="richtext grow space-y-3">
							<PortableText value={card.content} />
						</div>

						{/* Card Footer */}
						<div className="mt-auto space-y-3">
							<div className="via-surface-elevated h-px bg-gradient-to-r from-transparent to-transparent"></div>
							<CTAList ctas={card.ctas} />
						</div>

						{/* Hover Effect */}
						<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="from-accent-cyber/5 to-accent-matrix/5 absolute inset-0 bg-gradient-to-br via-transparent"></div>
							<div className="scan-lines"></div>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
