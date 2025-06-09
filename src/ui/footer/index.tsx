import { getSite } from '@/sanity/lib/queries'
import Navigation from './Navigation'
import Social from '@/ui/Social'
import LanguageSwitcher from '@/ui/LanguageSwitcher'
import ThemeToggle from '@/ui/ThemeToggle'
import { PortableText } from 'next-sanity'
import Link from 'next/link'
import { Img } from '@/ui/Img'

export default async function Footer() {
	const { title, blurb, logo, copyright } = await getSite()

	const logoImage = logo?.image?.light || logo?.image?.default

	return (
		<footer
			className="bg-canvas text-ink border-surface-elevated border-t"
			role="contentinfo"
		>
			{/* Main Footer Content */}
			<div className="section flex flex-wrap justify-between gap-x-12 gap-y-8 max-sm:flex-col">
				<div className="flex flex-col gap-4 self-stretch">
					<div className="flex flex-col gap-2">
						<Link className="h3 md:h2 text-gradient max-w-max" href="/">
							{logoImage ? (
								<Img
									className="max-h-[1.5em] w-auto"
									image={logoImage}
									alt={logo?.name || title}
								/>
							) : (
								title
							)}
						</Link>
						<div className="flex items-center gap-2">
							<div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
							<span className="font-mono text-xs text-green-400">
								SYSTEMS ONLINE
							</span>
						</div>
					</div>

					{blurb && (
						<div className="text-ink-muted max-w-sm text-sm leading-relaxed text-balance">
							<PortableText value={blurb} />
						</div>
					)}

					<Social className="mb-auto -ml-2" />

					<div className="mt-4 flex flex-wrap items-center gap-4">
						<LanguageSwitcher className="max-w-max" />
					</div>
				</div>

				<Navigation />
			</div>

			{/* Copyright Section */}
			{copyright && (
				<div className="border-surface-elevated bg-surface/50 border-t">
					<div className="section py-4">
						<div className="text-ink-subtle [&_a:hover]:text-accent-primary flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm [&_a]:transition-colors">
							<PortableText value={copyright} />
							<div className="bg-surface-elevated h-4 w-px"></div>
							<ThemeToggle />
						</div>
					</div>
				</div>
			)}
		</footer>
	)
}
