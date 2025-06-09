import { getSite } from '@/sanity/lib/queries'
import CTA from '@/ui/CTA'
import { stegaClean } from 'next-sanity'

export default async function Menu() {
	const { footerMenu } = await getSite()

	return (
		<nav className="flex flex-wrap items-start gap-x-12 gap-y-8 max-sm:flex-col">
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case 'link':
						return (
							<CTA
								className="text-accent-primary hover:text-accent-primary-hover transition-colors"
								link={item}
								key={key}
							/>
						)

					case 'link.list':
						return (
							<div className="space-y-3 text-start" key={key}>
								{/* Section Header */}
								<div className="technical text-accent-primary border-surface-elevated border-b pb-1 text-xs">
									<CTA link={item.link}>
										{stegaClean(item.link?.label) || item.link?.internal?.title}
									</CTA>
								</div>

								{/* Links List */}
								<ul className="space-y-2">
									{item.links?.map((link, key) => (
										<li key={key}>
											<CTA
												className="text-ink-muted hover:text-accent-primary inline-block py-1 text-sm transition-colors duration-200"
												link={link}
											/>
										</li>
									))}
								</ul>
							</div>
						)

					default:
						return null
				}
			})}
		</nav>
	)
}
