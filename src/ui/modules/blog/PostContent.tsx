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
		<article {...moduleProps(props)}>
			<header className="section space-y-2 text-center">
				<h1 className="text-gradient h1 text-balance py-2 text-4xl md:text-6xl">
					{post.metadata.title}
				</h1>
				<div className="flex flex-wrap items-center justify-center">
					<Categories
						className="flex flex-wrap gap-x-2"
						categories={post.categories}
					/>
				</div>
				{post.authors?.length && (
					<Authors
						className="flex flex-wrap items-center justify-center p-2.5 text-xl font-semibold md:text-2xl"
						authors={post.authors}
					/>
				)}
				<div className="flex flex-wrap items-center justify-center gap-x-6 text-sm">
					<Date value={post.publishDate} /> |
					<ReadTime value={post.readTime} />
				</div>
			</header>

			<div
				className={cn(
					'section grid gap-8',
					showTOC && 'lg:grid-cols-[1fr,auto]',
				)}
			>
				{showTOC && (
					<aside className="lg:sticky-below-header bg-base mx-auto w-full max-w-lg self-start text-base-content [--offset:1rem] lg:order-1 lg:w-[250px]">
						<TableOfContents headings={post.headings} />
					</aside>
				)}

				<Content
					value={post.body}
					className={cn(css.body, 'grid max-w-screen-md')}
				>
					<hr />
				</Content>
			</div>
		</article>
	)
}
