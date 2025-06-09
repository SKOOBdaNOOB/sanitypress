import { Fragment } from 'react'
import CTA from '@/ui/CTA'
import { stegaClean } from 'next-sanity'

export default async function Breadcrumbs({
	crumbs,
	hideCurrent,
	currentPage,
}: Partial<{
	crumbs: Sanity.Link[]
	hideCurrent?: boolean
	currentPage: Sanity.Page | Sanity.BlogPost
}>) {
	return (
		<nav className="mx-auto max-w-screen-xl px-4 py-4">
			{/* Clean breadcrumb path */}
			<div className="flex items-center gap-2">
				<span className="font-mono text-sm text-red-400">$</span>
				<span className="font-mono text-sm font-semibold text-red-400">
					Current Path
				</span>
			</div>

			<ol
				className="mt-1 flex flex-wrap items-center gap-1"
				itemScope
				itemType="https://schema.org/BreadcrumbList"
			>
				{/* Root indicator */}
				<li className="flex items-center">
					<span className="font-mono text-sm text-white">~/</span>
				</li>

				{crumbs?.map((crumb, key) => (
					<Fragment key={key}>
						<Crumb link={crumb} position={key + 1} />
						<li
							className="text-accent-primary font-mono text-sm"
							role="presentation"
						>
							/
						</li>
					</Fragment>
				))}

				<Crumb
					position={(crumbs?.length || 0) + 2}
					hidden={hideCurrent}
					isCurrent={true}
				>
					{currentPage?.title || currentPage?.metadata.title}
				</Crumb>
			</ol>
		</nav>
	)
}

function Crumb({
	link,
	position,
	children,
	hidden,
	isCurrent = false,
}: {
	link?: Omit<Sanity.Link, '_type'>
	position: number
	hidden?: boolean
	isCurrent?: boolean
} & React.ComponentProps<'li'>) {
	const content = (
		<>
			<span
				itemProp="name"
				hidden={hidden}
				className={
					isCurrent
						? 'current text-accent-code font-semibold'
						: 'text-ink-muted hover:text-accent-primary transition-colors'
				}
			>
				{stegaClean(
					children || link?.label || link?.internal?.title || link?.external,
				)}
			</span>
			<meta itemProp="position" content={position.toString()} />
		</>
	)

	return (
		<li
			className="line-clamp-1"
			itemProp="itemListElement"
			itemScope
			itemType="https://schema.org/ListItem"
		>
			{link && !isCurrent ? (
				<CTA
					className="hover:text-accent-primary font-mono text-sm transition-colors"
					link={{ _type: 'link', ...link }}
					itemProp="item"
				>
					{content}
				</CTA>
			) : (
				<span className="font-mono text-sm">{content}</span>
			)}
		</li>
	)
}
