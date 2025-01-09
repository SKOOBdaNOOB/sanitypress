'use client'

import { useState, useRef, useEffect } from 'react'
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile'

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
	useEffect(() => {}, [])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [error, setError] = useState('')
	const [token, setToken] = useState<string | null>(null)
	const [isWidgetReady, setIsWidgetReady] = useState(false)
	const turnstileRef = useRef<TurnstileInstance | null>(null)

	const [tokenTimestamp, setTokenTimestamp] = useState<number | null>(null)

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsSubmitting(true)
		setError('')

		if (!token || !tokenTimestamp) {
			setError('Please complete the CAPTCHA verification')
			setIsSubmitting(false)
			return
		}

		// Check if token is expired (5 minutes validity)
		const currentTime = Date.now()
		if (currentTime - tokenTimestamp > 5 * 60 * 1000) {
			setError('CAPTCHA verification expired. Please verify again.')
			setToken(null)
			setTokenTimestamp(null)
			turnstileRef.current?.reset()
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
				const errorData = await res.json()
				throw new Error(errorData.error || 'Failed to send message')
			}

			setIsSuccess(true)
			e.currentTarget.reset()
			turnstileRef.current?.reset()
			setToken(null)
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message)
			} else {
				setError(
					'Sorry, there was an error sending your message. Please try again.',
				)
			}
			turnstileRef.current?.reset()
			setToken(null)
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

			<div className="justify-items-center py-4">
				<div className="flex justify-center">
					{process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY && (
						<div className="h-[65px] w-[300px]">
							<Turnstile
								ref={turnstileRef}
								siteKey={process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY}
								options={{
									theme: 'light',
									size: 'normal',
									appearance: 'execute',
									retry: 'auto',
									retryInterval: 5000,
									responseField: false,
								}}
								onLoad={() => {
									setIsWidgetReady(true)
									setError('')
								}}
								onSuccess={(token) => {
									if (!token) {
										setError('CAPTCHA verification failed. Please try again.')
										return
									}
									setToken(token)
									setTokenTimestamp(Date.now())
									setError('')
								}}
								onError={(error) => {
									console.error('Turnstile error:', error)
									setError('CAPTCHA verification failed. Please try again.')
									setToken(null)
									setIsWidgetReady(false)
									setTimeout(() => {
										turnstileRef.current?.reset()
										setIsWidgetReady(true)
									}, 1000)
								}}
								onExpire={() => {
									setToken(null)
									setIsWidgetReady(false)
									turnstileRef.current?.reset()
									setIsWidgetReady(true)
								}}
								onBeforeInteractive={() => {
									setIsWidgetReady(false)
								}}
								onAfterInteractive={() => {
									setIsWidgetReady(true)
								}}
							/>
						</div>
					)}
				</div>

				<button
					type="submit"
					disabled={isSubmitting}
					className="mt-4 w-full rounded-lg bg-accent px-6 py-3 text-white transition-colors hover:bg-accent-hover disabled:opacity-50 dark:bg-accent-dark dark:hover:bg-accent-dark-hover"
				>
					{isSubmitting ? 'Sending...' : fields.submitLabel}
				</button>
			</div>
		</form>
	)
}
