'use client'

import { useState } from 'react'
import {
	motion,
	useSpring,
	useTransform,
	useMotionValue,
	AnimatePresence,
} from 'framer-motion'
import { PortableText } from 'next-sanity'
import Img from '../Img'
import { cn } from '@/lib/utils'

type CertificationsListProps = {
	intro?: any
	categories?: {
		category: string
		certs: {
			image: string
			name: string
			link?: string
		}[]
	}[]
}

export default function CertList({
	intro,
	categories,
}: CertificationsListProps) {
	const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)
	const springConfig = { stiffness: 100, damping: 5 }
	const x = useMotionValue(0)
	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig,
	)
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig,
	)

	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2
		x.set(event.nativeEvent.offsetX - halfWidth)
	}

	return (
		<section className="section space-y-8">
			{/* Intro Text */}
			{intro && (
				<header className="richtext text-center">
					<PortableText value={intro} />
				</header>
			)}

			{/* Certification Categories */}
			<div className="mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-6 max-md:flex-col">
				{categories?.map((category, idx) => (
					<div key={idx} className="space-y-6">
						{/* Certifications Grid */}
						<div className="flex flex-wrap items-center justify-center gap-4">
							{category.certs.map((cert, certIdx) => (
								<div
									key={certIdx}
									className="group relative -ml-10 items-center justify-center"
									onMouseEnter={() => {
										setHoveredIndex(`${idx}-${certIdx}`)
										// Dynamically set tooltip height
										const tooltipElement = document.getElementById(
											`tooltip-${idx}-${certIdx}`,
										)
										if (tooltipElement) {
											const tooltipHeight = tooltipElement.offsetHeight
											tooltipElement.style.top = `-${tooltipHeight + 8}px` // Position above the badge with 8px gap
										}
									}}
									onMouseLeave={() => setHoveredIndex(null)}
									style={{ zIndex: certIdx }}
								>
									{/* Tooltip Animation */}
									<AnimatePresence mode="popLayout">
										{hoveredIndex === `${idx}-${certIdx}` && (
											<motion.div
												initial={{ opacity: 0, y: 20, scale: 0.6 }}
												animate={{
													opacity: 1,
													y: 0,
													scale: 1,
													transition: {
														type: 'spring',
														stiffness: 260,
														damping: 10,
													},
												}}
												exit={{ opacity: 0, y: 20, scale: 0.6 }}
												style={{
													transform: 'translateX(-80%)', // Center relative to the badge
													translateX: translateX,
													rotate: rotate,
												}}
												className="absolute -top-9 z-20 flex translate-x-1/2 flex-col items-center justify-center rounded-md bg-accent px-4 py-2 shadow-xl"
											>
												<div className="relative z-30 text-center text-sm font-semibold text-accent-content">
													{cert.name}
												</div>
											</motion.div>
										)}
									</AnimatePresence>

									{/* Certification Badge Image */}
									<a href={cert.link} target="_blank" rel="noopener noreferrer">
										<Img
											height={100}
											width={100}
											image={cert.image}
											alt={cert.name}
											className="h-16 w-16 flex-auto justify-center rounded-full transition-transform duration-500 group-hover:z-30 group-hover:scale-105"
											onMouseMove={handleMouseMove}
										/>
									</a>
								</div>
							))}
						</div>
						{/* Category Title */}
						<div className="h2 flex flex-col justify-center text-center font-bold text-accent">
							{category.category}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
