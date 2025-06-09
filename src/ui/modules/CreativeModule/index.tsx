import moduleProps from '@/lib/moduleProps'
import { PortableText, stegaClean } from 'next-sanity'
import CTAsSubModule, { type CTAsSubModuleType } from './CTAsSubModule'
import CustomHTMLSubmodule, {
	type CustomHTMLSubmoduleType,
} from './CustomHTMLSubmodule'
import Icon, { getPixels } from '@/ui/Icon'
import ImageSubModule, { type ImageSubModuleType } from './ImageSubModule'
import RichtextSubModule, {
	type RichtextSubModuleType,
} from './RichtextSubModule'
import { cn } from '@/lib/utils'

export default function CreativeModule({
	intro,
	modules,
	columns,
	visualSeparation,
	textAlign: ta,
	alignItems: ai,
	...props
}: Partial<{
	intro: any
	modules: Partial<{
		subModules: Array<
			| ImageSubModuleType
			| Sanity.Icon
			| RichtextSubModuleType
			| CTAsSubModuleType
			| CustomHTMLSubmoduleType
		>
		colSpan: number
	}>[]
	columns: number
	visualSeparation: boolean
	textAlign: React.CSSProperties['textAlign']
	alignItems: React.CSSProperties['alignItems']
}>) {
	const width = Math.round((1200 / (columns || modules?.length || 1)) * 1.5)

	const textAlign = stegaClean(ta)
	const alignItems = stegaClean(ai)

	return (
		<section {...moduleProps(props)} className="grid-pattern">
			<div className="section space-y-12">
				{/* Technical Header */}
				{intro && (
					<header className="relative text-center">
						{/* Scan Lines Effect */}
						<div className="scan-lines pointer-events-none absolute inset-0"></div>

						{/* Module Status */}
						<div className="mb-6 flex items-center justify-center gap-2">
							<div className="status-indicator">
								<span className="technical">CREATIVE MODULE</span>
							</div>
						</div>

						{/* Enhanced Intro Content */}
						<div className="richtext relative z-10 mx-auto max-w-xl text-balance">
							<PortableText value={intro} />
						</div>

						{/* Terminal-style Separator */}
						<div className="mt-8 flex items-center justify-center gap-4">
							<div className="bg-accent-primary h-px max-w-20 flex-1"></div>
							<div className="terminal-text text-xs">●●●</div>
							<div className="bg-accent-primary h-px max-w-20 flex-1"></div>
						</div>
					</header>
				)}

				{/* Enhanced Grid Layout */}
				<div
					className={cn(
						'grid items-center md:grid-cols-[repeat(var(--col,1),minmax(0px,1fr))]',
						visualSeparation ? 'gap-6' : 'gap-x-12 gap-y-10',
					)}
					style={
						{
							'--col': columns || modules?.length,
							textAlign,
							alignItems,
						} as React.CSSProperties
					}
				>
					{modules?.map(({ subModules, colSpan = 1 }, i) => (
						<article
							className={cn('group space-y-6', {
								'md:col-(--col-span,1)': colSpan > 1,
								'terminal-window': visualSeparation,
								'flex flex-col justify-center': alignItems === 'stretch',
							})}
							style={
								{
									'--col-span': colSpan > 1 && `span ${colSpan}`,
								} as React.CSSProperties
							}
							key={i}
						>
							{/* Terminal Content Wrapper for Visual Separation */}
							<div
								className={cn(
									visualSeparation && 'terminal-content',
									!visualSeparation && 'space-y-6',
								)}
							>
								{/* Module Index Indicator */}
								{visualSeparation && (
									<div className="mb-4 flex items-center gap-2">
										<span className="technical text-accent-code">
											MODULE {String(i + 1).padStart(2, '0')}
										</span>
										<div className="bg-accent-code h-px flex-1"></div>
									</div>
								)}

								{subModules?.map((subModule, ii) => {
									switch (subModule._type) {
										case 'image':
											return (
												<div className="group/image relative" key={ii}>
													<ImageSubModule
														module={subModule}
														width={width * colSpan}
													/>
													{/* Image overlay effect */}
													<div className="bg-accent-primary/5 pointer-events-none absolute inset-0 rounded opacity-0 transition-opacity group-hover/image:opacity-100"></div>
												</div>
											)

										case 'icon':
											return (
												<figure
													className={cn(
														'relative',
														textAlign === 'center' && '[&_img]:mx-auto',
													)}
													style={{ height: getPixels(subModule?.size) }}
													key={ii}
												>
													{/* Icon background glow */}
													<div className="bg-accent-primary/10 absolute inset-0 rounded-full opacity-50 blur-xl"></div>
													<Icon icon={subModule} />
												</figure>
											)

										case 'richtext':
											return (
												<div className="relative" key={ii}>
													<RichtextSubModule module={subModule} />
												</div>
											)

										case 'ctas':
											return (
												<div className="relative" key={ii}>
													<CTAsSubModule
														module={subModule}
														className={cn(
															textAlign === 'center' && 'justify-center',
														)}
													/>
												</div>
											)

										case 'custom-html':
											return (
												<div className="relative" key={ii}>
													<CustomHTMLSubmodule module={subModule} />
												</div>
											)

										default:
											return null
									}
								})}

								{/* Module Status Footer for Visual Separation */}
								{visualSeparation && (
									<div className="border-terminal-border mt-6 border-t pt-4">
										<div className="flex items-center justify-between">
											<div className="status-indicator offline">
												<span className="terminal-text text-xs">
													MODULE COMPLETE
												</span>
											</div>
											<div className="terminal-text text-xs opacity-50">
												{subModules?.length || 0} COMPONENTS
											</div>
										</div>
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
