import { PortableText } from 'next-sanity'
import AnchoredHeading from './AnchoredHeading'
import Image from './Image'
import Code from './Code'
import CustomHTML from '@/ui/modules/CustomHTML'
import { cn } from '@/lib/utils'

export default function Content({
	value,
	className,
	children,
}: { value: any } & React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'richtext mx-auto w-full space-y-[1em] [&>:first-child]:!mt-0',
				className,
			)}
		>
			<PortableText
				value={value}
				components={{
					block: {
						h2: (node) => <AnchoredHeading as="h2" {...node} />,
						h3: (node) => <AnchoredHeading as="h3" {...node} />,
						h4: (node) => <AnchoredHeading as="h4" {...node} />,
						h5: (node) => <AnchoredHeading as="h5" {...node} />,
						h6: (node) => <AnchoredHeading as="h6" {...node} />,
						blockquote: ({ children }) => (
							<blockquote className="text-xl font-semibold italic text-base-content">
								<svg
									className="mb-1 h-8 w-8 text-accent"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 14"
								>
									<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
								</svg>
								<p className="pb-4">{children}</p>
							</blockquote>
						),
					},
					types: {
						image: Image,
						code: Code,
						'custom-html': ({ value }) => (
							<CustomHTML
								className="has-[table]:md:mx-auto has-[table]:md:[grid-column:bleed]"
								{...value}
							/>
						),
					},
				}}
			/>

			{children}
		</div>
	)
}
