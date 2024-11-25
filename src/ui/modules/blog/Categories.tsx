import Category from './Category'

export default function Categories({
	categories,
	...props
}: {
	categories?: Sanity.BlogCategory[]
} & React.ComponentProps<'ul'>) {
	if (!categories?.length) return null

	return (
		<ul
			{...props}
			className="flex flex-wrap items-start justify-end gap-2 text-sm font-medium text-accent"
		>
			{categories.map((category, key) => (
				<li key={key}>
					<Category value={category} />
				</li>
			))}
		</ul>
	)
}
