import Link from 'next/link'
import processUrl from '@/lib/processUrl'
import Img from '@/ui/Img'
import Date from '@/ui/Date'
import Categories from './Categories'
import Authors from './Authors'

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	return (
		<Link
			className="w-94 group card h-full bg-base-200 shadow-xl"
			href={processUrl(post, { base: false })}
		>
			{/* Card Image */}
			<figure className="relative">
				<Img
					className="aspect-video w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
					image={post.metadata.image}
					imageWidth={700}
					alt={post.metadata.title}
				/>
			</figure>

			<div className="card-body">
				<h2 className="font-accent card-title text-lg font-bold text-accent hover:link">
					{post.metadata.title}
					{post.featured && (
						<span className="badge badge-secondary text-secondary-content">
							Featured
						</span>
					)}
				</h2>

				<p className="text-sm italic">{post.metadata.description}</p>

				{post.authors?.length > 0 && (
					<div className="pt-2">
						<Authors
							className="flex flex-wrap items-center gap-4 text-sm font-semibold"
							authors={post.authors}
						/>
					</div>
				)}

				<div className="absolute bottom-2 left-4 justify-start text-base-content">
					<Date value={post.publishDate} />
				</div>
				<div className="card-actions justify-end">
					<Categories
						className="flex flex-wrap gap-2"
						categories={post.categories}
					/>
				</div>
			</div>
		</Link>
	)
}
