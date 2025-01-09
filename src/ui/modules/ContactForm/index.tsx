import Content from '@/ui/modules/RichtextModule/Content'
import Form from './Form'

interface ContactFormProps {
	title?: string
	description?: any[]
	emailTo: string
	successMessage: string
	fields: {
		nameLabel: string
		emailLabel: string
		subjectLabel: string
		messageLabel: string
		submitLabel: string
	}
}

export default function ContactForm({
	title,
	description,
	emailTo,
	successMessage,
	fields,
}: ContactFormProps) {
	return (
		<section className="section space-y-8 py-16">
			<div className="mx-auto max-w-2xl text-center">
				{title && (
					<h2 className="text-gradient mb-6 text-3xl font-bold dark:text-ink-dark md:text-4xl">
						{title}
					</h2>
				)}
				{description && (
					<div className="text-ink-light dark:text-ink-dark-light">
						<Content value={description} />
					</div>
				)}
			</div>

			<div className="mx-auto max-w-xl">
				<Form
					emailTo={emailTo}
					successMessage={successMessage}
					fields={fields}
				/>
			</div>
		</section>
	)
}
