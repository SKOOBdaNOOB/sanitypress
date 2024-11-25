import InteractiveDetails from './InteractiveDetails'
import { CgChevronRight } from 'react-icons/cg'
import CTA from '@/ui/CTA'
import { cn } from '@/lib/utils'

export default function LinkList({ link, links }: Sanity.LinkList) {
	return (
		<InteractiveDetails
			className="group relative"
			name="header"
			delay={10}
			closeAfterNavigate
		>
			{/* Desktop Summary */}
			<summary className="hidden content-center items-center gap-1 md:flex md:px-3">
				{link?.label}
				<CgChevronRight className="transition-transform group-open:rotate-90 md:rotate-90" />
			</summary>

			{/* Mobile Dropdown */}
			<div className="md:hidden">
				<details className="dropdown">
					<summary className="flex cursor-pointer content-center gap-1">
						{link?.label}
						<CgChevronRight className="rotate-90 transition-transform" />
					</summary>
					<ul className="menu dropdown-content w-52 rounded-box bg-base-100 p-2 shadow">
						{links?.map((link, key) => (
							<li key={key}>
								<CTA
									className={cn(
										'inline-block py-px hover:link',
										link.external?.startsWith('http') && 'is-external',
									)}
									link={link}
								/>
							</li>
						))}
					</ul>
				</details>
			</div>

			{/* Desktop Links */}
			<ul className="anim-fade-to-b md:frosted-glass md:bg-base left-0 top-full hidden content-center px-3 py-2 md:absolute md:block md:min-w-max md:rounded md:border md:shadow-md">
				{links?.map((link, key) => (
					<li key={key}>
						<CTA
							className={cn(
								'inline-block py-px hover:link',
								link.external?.startsWith('http') && 'is-external',
							)}
							link={link}
						/>
					</li>
				))}
			</ul>
		</InteractiveDetails>
	)
}
