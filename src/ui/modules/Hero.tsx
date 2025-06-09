import moduleProps from '@/lib/moduleProps'
import { ResponsiveImg } from '@/ui/Img'
import { PortableText, stegaClean } from 'next-sanity'
import CTAList from '@/ui/CTAList'
import Pretitle from '@/ui/Pretitle'
import CustomHTML from './CustomHTML'
import Reputation from '@/ui/Reputation'
import { cn } from '@/lib/utils'

export default function Hero({
	pretitle,
	content,
	ctas,
	assets,
	textAlign: ta = 'center',
	alignItems: ai,
	...props
}: Partial<{
	pretitle: string
	content: any
	ctas: Sanity.CTA[]
	assets: Sanity.Img[]
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}> &
	Sanity.Module) {
	const hasImage = !!assets?.[0]
	const asset = assets?.[0]

	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)

	return (
		<section
			className={cn(
				'relative min-h-fold grid-pattern scan-lines',
				hasImage &&
					'bg-ink text-canvas grid overflow-hidden *:col-span-full *:row-span-full',
				!hasImage && 'bg-canvas'
			)}
			{...moduleProps(props)}
		>
			{hasImage && (
				<ResponsiveImg
					img={asset}
					className="max-h-fold size-full object-cover opacity-60"
					width={2400}
					draggable={false}
				/>
			)}

			{content && (
				<div className="section flex w-full flex-col text-balance relative z-10">
					<div
						className={cn(
							'richtext headings:text-balance relative isolate max-w-4xl',
							hasImage && 'text-shadow',
							{
								'mb-8': alignItems === 'start',
								'my-auto': alignItems === 'center',
								'mt-auto': alignItems === 'end',
								'me-auto': ['left', 'start'].includes(textAlign),
								'mx-auto': textAlign === 'center',
								'ms-auto': ['right', 'end'].includes(textAlign),
							},
						)}
						style={{ textAlign }}
					>
						<Pretitle className={cn(
							'technical mb-4',
							hasImage ? 'text-canvas/70' : 'text-accent-primary'
						)}>
							{pretitle}
						</Pretitle>

						<div className="space-y-6">
							<PortableText
								value={content}
								components={{
									block: {
										normal: ({ children }) => (
											<p className="text-lg md:text-xl leading-relaxed text-ink-muted">
												{children}
											</p>
										),
										h1: ({ children }) => (
											<h1 className="h1 text-gradient cursor-blink">
												{children}
											</h1>
										),
										h2: ({ children }) => (
											<h2 className="h2 text-gradient">
												{children}
											</h2>
										),
									},
									marks: {
										strong: ({ children }) => (
											<strong className="text-gradient font-bold">
												{children}
											</strong>
										),
										code: ({ children }) => (
											<code className="code-text">
												{children}
											</code>
										),
									},
									types: {
										'custom-html': ({ value }) => <CustomHTML {...value} />,
										'reputation-block': ({ value }) => (
											<Reputation
												className={cn(
													'!mt-6',
													hasImage && '[&_strong]:text-amber-400',
													{
														'justify-start': ['left', 'start'].includes(
															textAlign,
														),
														'justify-center': textAlign === 'center',
														'justify-end': ['right', 'end'].includes(textAlign),
													},
												)}
												reputation={value.reputation}
											/>
										),
									},
								}}
							/>
						</div>

						<CTAList
							ctas={ctas}
							className={cn('!mt-8 gap-4', {
								'justify-start': textAlign === 'left',
								'justify-center': textAlign === 'center',
								'justify-end': textAlign === 'right',
							})}
						/>
					</div>
				</div>
			)}

			{/* Terminal-style status indicator */}
			{!hasImage && (
				<div className="absolute bottom-4 left-4">
					<div className="status-indicator">
						<span className="terminal-text text-sm">System Online</span>
					</div>
				</div>
			)}
		</section>
	)
}
