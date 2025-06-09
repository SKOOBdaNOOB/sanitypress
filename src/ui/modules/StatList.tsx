import Pretitle from '@/ui/Pretitle'
import { PortableText, stegaClean } from 'next-sanity'

export default function StatList({
	pretitle,
	intro,
	stats,
	textAlign: ta = 'center',
}: Partial<{
	pretitle: string
	intro: any
	stats: Partial<{
		prefix: string
		value: string
		suffix: string
		text: string
	}>[]
	textAlign: React.CSSProperties['textAlign']
}>) {
	const textAlign = stegaClean(ta)

	return (
		<section className="section relative space-y-12" style={{ textAlign }}>
			{/* System Monitor Header */}
			<div className="terminal-window">
				<div className="terminal-header">
					<div className="terminal-controls">
						<div className="terminal-dot bg-red-500"></div>
						<div className="terminal-dot bg-yellow-500"></div>
						<div className="terminal-dot bg-green-500"></div>
					</div>
					<div className="terminal-title">SYSTEM_METRICS</div>
				</div>
				<div className="terminal-content">
					<div className="status-indicator mb-4">
						<span className="technical">MONITORING: ACTIVE</span>
						<span className="text-accent-matrix ml-4">●</span>
					</div>
					<div className="text-ink-muted font-mono text-xs">
						<span className="text-accent-cyber">$</span> htop --sort-key
						PERCENT_CPU
					</div>
				</div>
			</div>

			{(pretitle || intro) && (
				<header className="richtext space-y-6 text-center">
					<Pretitle>{pretitle}</Pretitle>
					<div className="text-gradient-cyber">
						<PortableText value={intro} />
					</div>
				</header>
			)}

			<dl className="mx-auto grid items-start justify-center gap-x-8 gap-y-8 max-md:max-w-max sm:grid-cols-2 lg:grid-cols-3 xl:flex">
				{stats?.map(({ prefix, value, suffix, text }, key) => (
					<div
						className="group border-surface-elevated bg-surface/30 hover:border-accent-cyber hover:bg-surface/50 hover:shadow-accent-cyber/20 relative w-full max-w-[280px] overflow-hidden rounded-lg border p-6 transition-all duration-300 hover:shadow-lg max-md:mx-auto"
						key={key}
					>
						{/* Metric Header */}
						<div className="mb-4 flex items-center justify-between">
							<div className="status-indicator">
								<span className="technical text-xs">
									METRIC_{String(key + 1).padStart(2, '0')}
								</span>
								<span className="text-accent-matrix ml-2">●</span>
							</div>
							<div className="flex gap-1">
								<div className="bg-accent-matrix h-1.5 w-1.5 animate-pulse rounded-full"></div>
								<div className="bg-accent-cyber/60 h-1.5 w-1.5 rounded-full"></div>
								<div className="bg-accent-security/60 h-1.5 w-1.5 rounded-full"></div>
							</div>
						</div>

						{/* Main Metric Display */}
						<dt className="mb-4 text-center">
							<div className="text-ink-muted mb-2 font-mono text-xs">
								{prefix && <span className="text-accent-cyber">{prefix}</span>}
								<span className="text-accent-devops">VALUE</span>
								{suffix && <span className="text-accent-cyber">{suffix}</span>}
							</div>

							<div className="relative">
								<span className="text-gradient-cyber block text-5xl font-bold tracking-tight lg:text-6xl">
									{value}
								</span>
								<div className="via-accent-cyber/20 absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</div>
						</dt>

						{/* Metric Description */}
						{text && (
							<dd className="text-center">
								<div className="via-surface-elevated mb-2 h-px bg-gradient-to-r from-transparent to-transparent"></div>
								<span className="text-ink-muted font-mono text-sm font-medium">
									{text}
								</span>
							</dd>
						)}

						{/* Progress Bar Effect */}
						<div className="bg-surface-elevated absolute bottom-0 left-0 h-1 w-full">
							<div
								className="from-accent-cyber via-accent-matrix to-accent-devops h-full bg-gradient-to-r opacity-60 transition-all duration-500 group-hover:opacity-100"
								style={{
									width: `${Math.min(100, (parseInt(value || '0') || 0) % 100 || 75)}%`,
								}}
							></div>
						</div>

						{/* Scan Lines Effect */}
						<div className="scan-lines opacity-0 transition-opacity duration-300 group-hover:opacity-30"></div>
					</div>
				))}
			</dl>
		</section>
	)
}
