export default function ReadTime({ value }: { value: number }) {
	const minutes = Math.ceil(value)

	return (
		<span className="flex gap-2">
			Read time:{' '}
			<span className="italic">
				{minutes} {minutes === 1 ? 'minute' : 'minutes'}
			</span>
		</span>
	)
}
