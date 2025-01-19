import AccordionList from './AccordionList'
import BlogFrontpage from './blog/BlogFrontpage'
import BlogList from './blog/BlogList'
import BlogPostContent from './blog/PostContent'
import Breadcrumbs from './Breadcrumbs'
import Callout from './Callout'
import CardList from './CardList'
import CreativeModule from './CreativeModule'
import CustomHTML from './CustomHTML'
import FlagList from './FlagList'
import Hero from './Hero'
import HeroSplit from './HeroSplit'
import HeroSaaS from './HeroSaaS'
import LogoList from './LogoList'
import PricingList from './PricingList'
import RichtextModule from './RichtextModule'
import ScheduleModule from './ScheduleModule'
import SearchModule from './search'
import StatList from './StatList'
import StepList from './StepList'
import TabbedContent from './TabbedContent'
import TestimonialList from './TestimonialList'
import TestimonialFeatured from './TestimonialFeatured'
import ContactForm from './ContactForm'
import Timeline from './Timeline'

export default function Modules({
	modules,
	page,
	post,
}: {
	modules?: Sanity.Module[]
	page?: Sanity.Page
	post?: Sanity.BlogPost
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case 'accordion-list':
						return <AccordionList {...module} key={module._key} />
					case 'blog-frontpage':
						return <BlogFrontpage {...module} key={module._key} />
					case 'blog-list':
						return <BlogList {...module} key={module._key} />
					case 'blog-post-content':
						return <BlogPostContent {...module} post={post} key={module._key} />
					case 'breadcrumbs':
						return (
							<Breadcrumbs
								{...module}
								currentPage={post || page}
								key={module._key}
							/>
						)
					case 'callout':
						return <Callout {...module} key={module._key} />
					case 'card-list':
						return <CardList {...module} key={module._key} />
					case 'creative-module':
						return <CreativeModule {...module} key={module._key} />
					case 'custom-html':
						return <CustomHTML {...module} key={module._key} />
					case 'flag-list':
						return <FlagList {...module} key={module._key} />
					case 'hero':
						return <Hero {...module} key={module._key} />
					case 'hero.split':
						return <HeroSplit {...module} key={module._key} />
					case 'hero.saas':
						return <HeroSaaS {...module} key={module._key} />
					case 'logo-list':
						return <LogoList {...module} key={module._key} />
					case 'pricing-list':
						return <PricingList {...module} key={module._key} />
					case 'richtext-module':
						return <RichtextModule {...module} key={module._key} />
					case 'schedule-module':
						return <ScheduleModule {...module} key={module._key} />
					case 'search-module':
						return <SearchModule {...module} key={module._key} />
					case 'stat-list':
						return <StatList {...module} key={module._key} />
					case 'step-list':
						return <StepList {...module} key={module._key} />
					case 'tabbed-content':
						return <TabbedContent {...module} key={module._key} />
					case 'testimonial-list':
						return <TestimonialList {...module} key={module._key} />
					case 'testimonial.featured':
						return <TestimonialFeatured {...module} key={module._key} />
					case 'contactForm':
						return (
							<ContactForm
								emailTo={''}
								successMessage={''}
								fields={{
									nameLabel: '',
									emailLabel: '',
									subjectLabel: '',
									messageLabel: '',
									submitLabel: '',
								}}
								{...module}
								key={module._key}
							/>
						)
					case 'timeline':
						return (
							<Timeline
								{...(module as Sanity.TimelineModule)}
								key={module._key}
							/>
						)
					default:
						return <div data-type={module._type} key={module._key} />
				}
			})}
		</>
	)
}

export { default as AccordionList } from './AccordionList'
export { default as BlogFrontpage } from './blog/BlogFrontpage'
export { default as BlogList } from './blog/BlogList'
export { default as BlogPostContent } from './blog/PostContent'
export { default as Breadcrumbs } from './Breadcrumbs'
export { default as Callout } from './Callout'
export { default as CardList } from './CardList'
export { default as CreativeModule } from './CreativeModule'
export { default as CustomHTML } from './CustomHTML'
export { default as FlagList } from './FlagList'
export { default as Hero } from './Hero'
export { default as HeroSplit } from './HeroSplit'
export { default as HeroSaaS } from './HeroSaaS'
export { default as LogoList } from './LogoList'
export { default as PricingList } from './PricingList'
export { default as RichtextModule } from './RichtextModule'
export { default as ScheduleModule } from './ScheduleModule'
export { default as SearchModule } from './search'
export { default as StatList } from './StatList'
export { default as StepList } from './StepList'
export { default as TabbedContent } from './TabbedContent'
export { default as TestimonialList } from './TestimonialList'
export { default as TestimonialFeatured } from './TestimonialFeatured'
export { default as ContactForm } from './ContactForm'
export { default as Timeline } from './Timeline'
