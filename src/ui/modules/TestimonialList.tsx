import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'
import { Img } from '@/ui/Img'
import { VscSurroundWith } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function TestimonialList({
	pretitle,
	intro,
	testimonials,
	layout: l,
	layoutMobile: lm,
}: Partial<{
	pretitle: string
	intro: any
	testimonials: Sanity.Testimonial[]
	layout: 'grid' | 'carousel'
	layoutMobile: 'grid' | 'carousel'
}>) {
	const layout = stegaClean(l)
	const layoutMobile = stegaClean(lm)

	return (
		<section className="section relative space-y-12">
			{/* Terminal Chat Header */}
			<div className="terminal-window">
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="terminal-dot bg-red-500"></div>
						<div className="terminal-dot bg-yellow-500"></div>
						<div className="terminal-dot bg-green-500"></div>
					</div>
					<div className="terminal-title">TESTIMONIAL_CHAT</div>
				</div>
				<div className="terminal-content">
					<div className="status-indicator mb-4">
						<span className="technical">CHAT STATUS: ACTIVE</span>
						<span className="text-accent-matrix ml-4">●</span>
					</div>
					<div className="text-ink-muted font-mono text-xs">
						<span className="text-accent-cyber">$</span> cat
						/var/log/testimonials.log
					</div>
				</div>
			</div>

			{(pretitle || intro) && (
				<header className="richtext space-y-6 text-center">
					<Pretitle>{pretitle}</Pretitle>
					<div className="text-gradient-cyber">
						<PortableText value={intro} />
					</div>
				</header>
			)}

			<div
				className={cn(
					'gap-8',
					layout === 'carousel'
						? 'carousel max-md:full-bleed md:overflow-fade-r pb-4 max-md:px-4'
						: 'grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]',
					layoutMobile === 'carousel' &&
						'max-md:carousel max-md:full-bleed max-md:px-4 max-md:pb-4',
				)}
			>
				{testimonials?.map(
					(testimonial, key) =>
						testimonial && (
							<article
								className="group border-surface-elevated bg-surface/30 hover:border-accent-cyber hover:bg-surface/50 hover:shadow-accent-cyber/20 relative basis-[min(450px,70vw)]! overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:shadow-lg"
								key={key}
							>
								{/* Chat Message Header */}
								<div className="mb-4 flex items-center justify-between">
									<div className="status-indicator">
										<span className="technical text-xs">
											MSG_{String(key + 1).padStart(3, '0')}
										</span>
										<span className="text-accent-matrix ml-2">●</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="bg-accent-matrix h-1.5 w-1.5 animate-pulse rounded-full"></div>
										<span className="text-ink-muted font-mono text-xs">
											VERIFIED
										</span>
									</div>
								</div>

								<blockquote className="space-y-4">
									{/* Message Content */}
									<div className="border-surface-elevated bg-surface/50 relative rounded border p-4">
										<div className="richtext text-balance">
											<PortableText value={testimonial.content} />
										</div>
										{/* Chat bubble tail */}
										<div className="border-surface-elevated bg-surface/50 absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-r border-b"></div>
									</div>

									{/* Author Info */}
									{testimonial.author && (
										<div className="flex items-center gap-3">
											<div className="relative">
												<Img
													className="border-accent-cyber/30 group-hover:border-accent-cyber size-[48px] shrink-0 rounded-full border-2 object-cover transition-all duration-300"
													image={testimonial.author.image}
													width={96}
													alt={
														[testimonial.author.name, testimonial.author.title]
															.filter(Boolean)
															.join(', ') || 'Author'
													}
												/>
												<div className="border-surface bg-accent-matrix absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2"></div>
											</div>

											<dl className="flex-1">
												<dt className="flex flex-wrap items-center gap-2">
													<span className="text-accent-cyber font-mono font-semibold">
														{testimonial.author.name}
													</span>

													{testimonial.source && (
														<cite>
															<a
																className="text-accent-cyber/60 hover:text-accent-cyber transition-colors"
																href={testimonial.source}
																target="_blank"
																title="Source"
															>
																<VscSurroundWith />
															</a>
														</cite>
													)}
												</dt>

												{testimonial.author.title && (
													<dd className="text-ink-muted font-mono text-xs">
														{testimonial.author.title}
													</dd>
												)}
											</dl>

											{/* Timestamp */}
											<div className="text-ink-muted font-mono text-xs">
												{new Date().toLocaleTimeString('en-US', {
													hour12: false,
													hour: '2-digit',
													minute: '2-digit',
												})}
											</div>
										</div>
									)}
								</blockquote>

								{/* Hover Effect */}
								<div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<div className="from-accent-cyber/5 to-accent-matrix/5 absolute inset-0 bg-gradient-to-br via-transparent"></div>
									<div className="scan-lines"></div>
								</div>
							</article>
						),
				)}
			</div>
		</section>
	)
}
