'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import Img from '@/ui/Img'
import css from './blog/PostContent.module.css'

// This is a custom module developed for the SanityPress project utilizing the Acetrenity UI timeline component and DaisyUI for systematic themeing of light and dark mode

export default function TimelineModule({
	title,
	intro,
	events,
}: Partial<{
	title?: any
	intro?: any
	events: {
		event: string
		description: string
		date: string
		image: any
	}[]
}>) {
	const ref = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState<number>(0)

	// Calculate height of the timeline container
	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect()
			setHeight(rect.height)
		}
	}, [ref])

	// Set up Framer Motion scroll progress tracking
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start 10%', 'end 50%'], // Adjust offsets as needed
	})

	// Transform values for the animated gradient
	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

	return (
		<div className="w-full bg-base-100 font-sans md:px-10" ref={containerRef}>
			{/* Title and Introduction */}
			<div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
				<Content value={title} className={cn(css.body, 'mb-4 max-w-4xl')} />
				<Content value={intro} className={cn(css.body, 'mb-4 max-w-4xl')} />
			</div>
			{/* Timeline Events */}
			<div ref={ref} className="relative mx-auto max-w-7xl pb-20">
				{/* Event Mapping */}
				{events?.map((event, index) => (
					<div
						key={index}
						className="flex justify-start pt-10 md:gap-10 md:pt-40"
					>
						{/* Sticky Year Indicator */}
						<div className="sticky top-40 z-40 flex max-w-xs flex-col content-center items-center self-start md:w-full md:flex-row lg:max-w-sm">
							<div className="bg-base absolute left-3 flex h-10 w-10 items-center justify-center rounded-full md:left-3">
								<div className="h-4 w-4 rounded-full border border-secondary bg-secondary" />
							</div>
							{/* Display Year */}
							{event.date && (
								<span className="text-gradient mb-4 hidden text-2xl font-bold md:block md:pl-20 md:text-5xl">
									{new Date(event.date).getFullYear()}
								</span>
							)}
						</div>

						{/* Event Content */}
						<div className="relative w-full pl-20 pr-4 md:pl-4">
							{/* Event Title */}
							<Content
								value={event.event}
								className={cn(css.body, 'mb-4 block text-left md:hidden')}
							/>
							{/* Event Description */}
							<Content
								value={event.description}
								className={cn(
									css.body,
									'ml-4 flex max-w-64 grid-flow-col content-center md:max-w-96 md:flex-row',
								)}
							/>
							{/* Event Image */}
							{event.image && (
								<Img
									className="mt-4 flex max-w-64 grid-flow-col content-center rounded-lg shadow-md md:max-h-fit md:max-w-80"
									image={event.image}
									imageWidth={800}
									alt={event.event}
								/>
							)}
						</div>
					</div>
				))}

				{/* Timeline Gradient Bar */}
				<div
					ref={containerRef}
					style={{
						height: height + 'px',
					}}
					className="from-base-neutral absolute left-8 top-0 w-[2px] bg-gradient-to-br from-accent via-accent-content to-transparent"
				>
					{/* Animated Gradient */}
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-secondary-content via-secondary to-transparent"
					/>
				</div>
			</div>
		</div>
	)
}
