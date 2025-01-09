'use client'

import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface FormProps {
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

export default function Form({ emailTo, successMessage, fields }: FormProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState('')
	const [token, setToken] = useState<string | null>(null)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsSubmitting(true)
		setError('')

		if (!token) {
			setError('Please complete the CAPTCHA verification')
			setIsSubmitting(false)
			return
		}

		const formData = new FormData(e.currentTarget)
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			subject: formData.get('subject'),
			message: formData.get('message'),
			emailTo,
			token,
		}

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})

			if (!res.ok) {
				throw new Error('Failed to send message')
			}

			setIsSuccess(true)
			e.currentTarget.reset()
		} catch (err) {
			setError(
				'Sorry, there was an error sending your message. Please try again.',
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	if (isSuccess) {
		return (
			<div className="rounded-lg border border-accent/20 bg-accent/5 p-6 text-center dark:border-accent-dark/20 dark:bg-accent-dark/5">
				<p className="text-ink dark:text-ink-dark">{successMessage}</p>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="mb-3 block text-base font-semibold text-ink dark:text-ink-dark"
					>
						{fields.nameLabel}
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						className="w-full rounded-lg border border-ink/10 bg-canvas px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-ink-dark/10 dark:bg-canvas-dark dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark"
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="mb-3 block text-base font-semibold text-ink dark:text-ink-dark"
					>
						{fields.emailLabel}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						className="w-full rounded-lg border border-ink/10 bg-canvas px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-ink-dark/10 dark:bg-canvas-dark dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark"
					/>
				</div>

				<div>
					<label
						htmlFor="subject"
						className="mb-3 block text-base font-semibold text-ink dark:text-ink-dark"
					>
						{fields.subjectLabel}
					</label>
					<input
						type="text"
						id="subject"
						name="subject"
						required
						className="w-full rounded-lg border border-ink/10 bg-canvas px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-ink-dark/10 dark:bg-canvas-dark dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark"
					/>
				</div>

				<div>
					<label
						htmlFor="message"
						className="mb-3 block text-base font-semibold text-ink dark:text-ink-dark"
					>
						{fields.messageLabel}
					</label>
					<textarea
						id="message"
						name="message"
						rows={4}
						required
						className="w-full rounded-lg border border-ink/10 bg-canvas px-4 py-2 text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent dark:border-ink-dark/10 dark:bg-canvas-dark dark:text-ink-dark dark:focus:border-accent-dark dark:focus:ring-accent-dark"
					/>
				</div>
			</div>

			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-500/20 dark:bg-red-900/20 dark:text-red-400">
					{error}
				</div>
			)}

			<div className="justify-items-center space-y-4 py-4">
				<div className="flex justify-center">
					<Turnstile
						siteKey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY || ''}
						options={{
							theme: 'light',
							size: 'normal',
							appearance: 'always',
						}}
						onSuccess={(token) => {
							setToken(token)
							setError('')
						}}
						onError={(error) => {
							console.error('Turnstile error:', error)
							setError('CAPTCHA verification failed. Please try again.')
							setToken(null)
						}}
						onExpire={() => {
							console.log('Turnstile token expired')
							setToken(null)
						}}
					/>
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent-hover disabled:opacity-50 dark:bg-accent-dark dark:hover:bg-accent-dark-hover"
				>
					{isSubmitting ? 'Sending...' : fields.submitLabel}
				</button>
			</div>
		</form>
	)
}
