import moduleProps from '@/lib/moduleProps'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'
import ReadTime from './ReadTime'
import TableOfContents from '@/ui/modules/RichtextModule/TableOfContents'
import Content from '@/ui/modules/RichtextModule/Content'
import { cn } from '@/lib/utils'
import css from './PostContent.module.css'

export default function PostContent({
	post,
	...props
}: { post?: Sanity.BlogPost } & Sanity.Module) {
	if (!post) return null

	const showTOC = !post.hideTableOfContents || !!post.headings?.length

	return (
		<article {...moduleProps(props)} className="grid-pattern">
			{/* Hero Section with Technical Styling */}
			<header className="section relative space-y-8 text-center">
				{/* Scan Lines Effect */}
				<div className="scan-lines pointer-events-none absolute inset-0"></div>

				{/* Technical Status Indicator */}
				<div className="mb-4 flex items-center justify-center gap-2">
					<div className="status-indicator">
						<span className="technical">BLOG POST</span>
					</div>
				</div>

				{/* Title with Gradient Effect */}
				<h1 className="h1 text-gradient relative z-10 text-balance">
					{post.metadata.title}
				</h1>

				{/* Metadata with Technical Styling */}
				<div className="relative z-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
					<div className="flex items-center gap-2">
						<span className="technical text-accent-primary">PUBLISHED</span>
						<div className="terminal-text text-sm">
							<Date value={post.publishDate} />
						</div>
					</div>

					{post.categories?.length && (
						<div className="flex items-center gap-2">
							<span className="technical text-accent-warning">TAGS</span>
							<Categories
								className="flex flex-wrap gap-x-2"
								categories={post.categories}
								linked
							/>
						</div>
					)}

					<div className="flex items-center gap-2">
						<span className="technical text-accent-success">READ TIME</span>
						<div className="terminal-text text-sm">
							<ReadTime value={post.readTime} />
						</div>
					</div>
				</div>

				{/* Authors Section */}
				{post.authors?.length && (
					<div className="relative z-10">
						<div className="technical text-accent-code mb-3">AUTHORS</div>
						<Authors
							className="flex flex-wrap items-center justify-center gap-4"
							authors={post.authors}
							linked
						/>
					</div>
				)}

				{/* Terminal-style Separator */}
				<div className="relative z-10 flex items-center justify-center gap-4">
					<div className="bg-accent-primary h-px max-w-20 flex-1"></div>
					<div className="terminal-text text-xs">●●●</div>
					<div className="bg-accent-primary h-px max-w-20 flex-1"></div>
				</div>
			</header>

			{/* Content Section */}
			<div
				className={cn(
					'section grid gap-8',
					showTOC && 'lg:grid-cols-[1fr_auto]',
				)}
			>
				{/* Table of Contents */}
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-3xs">
						<div className="terminal-window">
							<div className="terminal-content">
								<div className="technical text-accent-primary mb-4">
									TABLE OF CONTENTS
								</div>
								<TableOfContents headings={post.headings} />
							</div>
						</div>
					</aside>
				)}

				{/* Main Content */}
				<Content
					value={post.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				>
					{/* Technical Footer Separator */}
					<div className="my-8 flex items-center justify-center gap-4">
						<div className="bg-accent-primary h-px flex-1"></div>
						<div className="terminal-text text-xs">END OF POST</div>
						<div className="bg-accent-primary h-px flex-1"></div>
					</div>
				</Content>
			</div>
		</article>
	)
}
