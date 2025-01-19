'use client'

import Img from '@/ui/Img'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import type { ReactElement } from 'react'

interface TimelineOptions {
	containerWidth?: 'default' | 'wide' | 'narrow'
	textAlignment?: 'left' | 'center' | 'right'
	showDates?: boolean
	imageSize?: 'small' | 'medium' | 'large'
	staggerDelay?: number
	animationDuration?: number
	lineColor?: string
	pointColor?: string
	responsiveBreakpoint?: 'sm' | 'md' | 'lg'
}

type Props = Sanity.TimelineModule & {
	className?: string
	options?: TimelineOptions
}

export default function Timeline({
	title,
	items,
	options,
	className,
}: Props): ReactElement {
	// State for managing animated item visibility
	const [visibleItems, setVisibleItems] = useState<number[]>([])
	const containerRef = useRef<HTMLDivElement>(null)

	// Default options with fallback values
	const {
		containerWidth = 'default',
		textAlignment = 'left',
		showDates = true,
		imageSize = 'medium',
		staggerDelay = 150,
		animationDuration = 700,
		responsiveBreakpoint = 'md',
	} = options || {}

	// Intersection Observer for triggering animations when items come into view
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute('data-index'))
						setTimeout(() => {
							setVisibleItems((prev) => [...prev, index])
						}, index * staggerDelay)
					}
				})
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -100px 0px',
			},
		)

		const items = containerRef.current?.querySelectorAll('.timeline-item')
		items?.forEach((item, index) => {
			item.setAttribute('data-index', index.toString())
			observer.observe(item)
		})

		return () => observer.disconnect()
	}, [staggerDelay])

	return (
		<div
			ref={containerRef}
			className={cn(
				'mx-auto mb-10 mt-10 px-4',
				{
					container: containerWidth === 'default',
					'container max-w-screen-xl': containerWidth === 'wide',
					'container max-w-screen-lg': containerWidth === 'narrow',
				},
				className,
			)}
		>
			{/* Module title using ink colors for light/dark modes */}
			{title && (
				<h2 className="text-gradient mb-8 text-3xl font-bold text-ink dark:text-ink-dark">
					{title}
				</h2>
			)}

			<div className="relative mx-auto max-w-screen-lg">
				{/* Timeline vertical line with gradient background */}
				<div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-ink/10 via-ink/10 to-ink/10 dark:from-ink-dark/10 dark:via-ink-dark/10 dark:to-ink-dark/10">
					{/* Timeline points mapped over items */}
					{items.map((_, index) => {
						const position =
							items.length > 1 ? (index / (items.length - 1)) * 100 : 50
						return (
							<div
								key={index}
								className={cn(
									'absolute left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-4 border-canvas bg-gradient-to-br shadow-lg transition-all duration-300 hover:scale-110 dark:border-canvas-dark',
									{
										// Use accent colors for points unless custom color provided
										'from-accent to-accent hover:from-accent-hover hover:to-accent-hover dark:from-accent-dark dark:to-accent-dark dark:hover:from-accent-dark-hover dark:hover:to-accent-dark-hover':
											!options?.pointColor,
										[options?.pointColor || '']: options?.pointColor,
									},
								)}
								style={{
									top: `${position}%`,
									marginTop: '0rem',
								}}
							/>
						)
					})}
				</div>

				{/* Timeline items with alternating layout */}
				{items.map((item: Sanity.TimelineItem, index: number) => (
					<div
						key={index}
						className={cn(
							'timeline-item relative md:pl-0',
							index !== items.length - 1 ? 'mb-12' : '',
						)}
						data-index={index}
						style={{
							marginTop: index === 0 ? '0' : '0.5rem',
						}}
					>
						<div
							className={cn('flex flex-col items-start gap-6 md:flex-row', {
								'md:items-start': true,
								'md:flex-row-reverse': index % 2 === 1, // Alternate sides on desktop
							})}
						>
							{/* Date display (if enabled) */}
							{showDates && (
								<div
									className={cn('w-full md:mb-0 md:w-1/2', {
										'md:pr-16 md:text-right': index % 2 === 0,
										'md:pl-16 md:text-left': index % 2 === 1,
									})}
									style={{
										marginTop: '1.5rem',
									}}
								>
									<time
										className="text-2xl font-bold text-ink/60 dark:text-ink-dark/60 md:text-3xl"
										dateTime={format(new Date(item.date), 'yyyy-MM')}
									>
										{format(new Date(item.date), 'MMMM yyyy')}
									</time>
								</div>
							)}
							{/* Content container */}
							<div
								className={cn('w-full', {
									'md:w-1/2 md:pl-8': showDates && index % 2 === 0,
									'md:w-1/2 md:pr-8': showDates && index % 2 === 1,
									'md:w-full': !showDates,
									'md:px-8': !showDates,
								})}
								style={{
									marginTop: '1.5rem',
								}}
							>
								{/* Content card with animation */}
								<div
									className={cn(
										'transform rounded-lg bg-canvas/30 p-6 pl-8 shadow transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:bg-canvas-dark dark:shadow-lg',
										visibleItems.includes(index)
											? 'translate-y-0 opacity-100'
											: 'translate-y-8 opacity-0',
										{
											'text-left': textAlignment === 'left',
											'text-center': textAlignment === 'center',
											'text-right': textAlignment === 'right',
										},
									)}
								>
									<h3 className="mb-2 text-xl font-bold text-ink dark:text-ink-dark">
										{item.title}
									</h3>
									{/* Rich text content */}
									{item.description && (
										<div className="prose dark:prose-invert text-ink/80 dark:text-ink-dark/80">
											<PortableText value={item.description} />
										</div>
									)}
									{/* Optional image */}
									{item.image && (
										<div className="mt-4">
											<Img
												image={item.image}
												alt={
													item.image.alt || item.title || 'Timeline event image'
												}
												className={cn('aspect-video rounded-lg object-cover', {
													'max-w-[200px]': imageSize === 'small',
													'max-w-[400px]': imageSize === 'medium',
													'max-w-[600px]': imageSize === 'large',
												})}
												imageWidth={
													imageSize === 'small'
														? 400
														: imageSize === 'medium'
															? 800
															: 1200
												}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
