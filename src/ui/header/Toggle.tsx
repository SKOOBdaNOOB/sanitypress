export default function Toggle() {
	return (
		<label htmlFor="header-open" className="btn btn-ghost md:hidden">
			<input id="header-open" type="checkbox" hidden />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 header-open:hidden"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M4 6h16M4 12h8m-8 6h16"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6 header-closed:hidden"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</label>
	)
}
