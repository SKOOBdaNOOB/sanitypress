import { codeToHtml, splitLines } from 'shiki'
import ClickToCopy from '@/ui/ClickToCopy'
import css from './Code.module.css'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default async function Code({
	value,
}: {
	value?: {
		language: string
		code: string
		filename?: string
		highlightedLines?: number[]
	}
}) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language,
		themes: {
			light: 'everforest-dark',
			dark: 'dracula-soft',
		},
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => {
				return {
					start: { line: row - 1, character: 0 },
					end: { line: row - 1, character: characters },
					properties: { class: 'highlight' },
				}
			}),
	})

	return (
		<article className="group relative !mb-2 !mt-6 rounded bg-base-200">
			<div className="absolute left-2 flex space-x-1.5 py-3">
				<span className="h-3 w-3 rounded-full bg-red-500 opacity-50"></span>
				<span className="h-3 w-3 rounded-full bg-yellow-500 opacity-50"></span>
				<span className="h-3 w-3 rounded-full bg-green-500 opacity-50"></span>
			</div>

			{value.filename && (
				<div className="-mb-1 rounded-t bg-base-300 px-2 py-1 pl-16 font-mono text-xs text-secondary-content">
					<span className="inline-block rounded-t border-b border-double border-accent bg-base-200 px-3 py-2">
						📁 {value.filename}
					</span>
				</div>
			)}

			<div className="relative">
				<div className={css.code} dangerouslySetInnerHTML={{ __html: html }} />

				<ClickToCopy
					value={stegaClean(value.code)}
					className={cn(
						'anim-fade-to-l absolute right-0 top-0 m-2 hidden place-items-center rounded p-1 text-center text-lg text-neutral-content md:text-xl',
						'hover:bg-neutral active:scale-95 active:bg-neutral group-hover:block',
					)}
				/>
			</div>
		</article>
	)
}
