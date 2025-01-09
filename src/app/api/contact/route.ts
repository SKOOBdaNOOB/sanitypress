import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
	try {
		const { name, email, subject, message, emailTo, token } =
			await request.json()

		// Basic validation
		if (!name || !email || !subject || !message || !emailTo || !token) {
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400 },
			)
		}

		// Verify Turnstile token
		const verificationResponse = await fetch(
			'https://challenges.cloudflare.com/turnstile/v0/siteverify',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					secret: process.env.CF_TURNSTILE_SECRET_KEY,
					response: token,
				}),
			},
		)

		const verificationResult = await verificationResponse.json()
		if (!verificationResult.success) {
			return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 })
		}

		// Send email using Resend
		await resend.emails.send({
			from: 'Contact Form <contact@resend.dev>',
			to: emailTo,
			subject: `New Contact Form Submission: ${subject}`,
			text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
			`,
			replyTo: email,
		})

		return NextResponse.json(
			{ message: 'Email sent successfully' },
			{ status: 200 },
		)
	} catch (error) {
		console.error('Error sending email:', error)
		return NextResponse.json(
			{ error: 'Error sending message' },
			{ status: 500 },
		)
	}
}
