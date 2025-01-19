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
	const [visibleItems, setVisibleItems] = useState<number[]>([])
	const containerRef = useRef<HTMLDivElement>(null)

	const {
		containerWidth = 'default',
		textAlignment = 'left',
		showDates = true,
		imageSize = 'medium',
	} = options || {}

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute('data-index'))
						setTimeout(() => {
							setVisibleItems((prev) => [...prev, index])
						}, index * 150) // Stagger delay based on index
					}
				})
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -100px 0px', // Trigger animation slightly before element is in view
			},
		)

		const items = containerRef.current?.querySelectorAll('.timeline-item')
		items?.forEach((item, index) => {
			item.setAttribute('data-index', index.toString())
			observer.observe(item)
		})

		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={containerRef}
			className={cn(
				'mx-auto px-4',
				{
					container: containerWidth === 'default',
					'container max-w-screen-xl': containerWidth === 'wide',
					'container max-w-screen-lg': containerWidth === 'narrow',
				},
				className,
			)}
		>
			{title && (
				<h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-gray-100">
					{title}
				</h2>
			)}

			<div className="relative">
				<div className="absolute left-4 h-full w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2">
					{items.map((_, index) => (
						<div
							key={index}
							className="absolute -left-[5px] h-3 w-3 rounded-full border-2 border-white bg-gray-400 dark:border-gray-800 dark:bg-gray-500"
							style={{ top: `${(index / items.length) * 100}%` }}
						/>
					))}
				</div>

				{items.map((item: Sanity.TimelineItem, index: number) => (
					<div
						key={index}
						className="timeline-item relative mb-8 pl-8 md:pl-0"
						data-index={index}
					>
						<div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
							{showDates && (
								<div className="w-full md:mb-0 md:w-1/2 md:pr-8 md:text-right">
									<time
										className="text-sm text-gray-500 dark:text-gray-400"
										dateTime={format(new Date(item.date), 'yyyy-MM')}
									>
										{format(new Date(item.date), 'MMMM yyyy')}
									</time>
								</div>
							)}
							<div className="w-full md:w-1/2 md:pl-8">
								<div
									className={cn(
										'transform rounded-lg bg-white p-6 shadow transition-all duration-500 ease-out dark:bg-gray-800 dark:shadow-lg',
										visibleItems.includes(index)
											? 'translate-y-0 opacity-100'
											: 'translate-y-8 opacity-0',
									)}
								>
									<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">
										{item.title}
									</h3>
									{item.description && (
										<div className="prose dark:prose-invert">
											<PortableText value={item.description} />
										</div>
									)}
									{item.image && (
										<div className="mt-4">
											<Img
												image={item.image}
												alt={
													item.image.alt || item.title || 'Timeline event image'
												}
												className={cn('rounded-lg', {
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
