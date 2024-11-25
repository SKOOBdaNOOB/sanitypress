export default function SkipToContent() {
	return (
		<a
			href="#main-content"
			className="bg-base absolute left-0 top-0 z-20 -translate-x-full text-base-content focus:translate-x-0"
			tabIndex={0}
		>
			Skip to content
		</a>
	)
}
