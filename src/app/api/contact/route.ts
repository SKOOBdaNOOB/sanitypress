import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import type { NextRequest } from 'next/server'
import { validateToken } from '@/lib/turnstile'

// Set CORS headers
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
	// Handle OPTIONS request for CORS preflight
	if (request.method === 'OPTIONS') {
		return new NextResponse(null, {
			headers: corsHeaders,
		})
	}

	// Handle token validation requests
	if (
		request.method === 'POST' &&
		request.nextUrl.searchParams.get('validate')
	) {
		const { token } = await request.json()

		if (!token) {
			return NextResponse.json({ valid: false }, { status: 400 })
		}

		const isValid = await validateToken(token)
		return NextResponse.json(
			{ valid: isValid },
			{ status: isValid ? 200 : 400 },
		)
	}

	// Add CORS headers to response
	const responseHeaders = new Headers(corsHeaders)
	try {
		console.log('Received contact form submission')
		const { name, email, subject, message, emailTo, token } =
			await request.json()

		// Basic validation
		if (!name || !email || !subject || !message || !emailTo || !token) {
			console.log('Missing required fields')
			return NextResponse.json(
				{ error: 'Missing required fields' },
				{ status: 400, headers: responseHeaders },
			)
		}

		console.log('Validating Turnstile token')
		console.log('Using secret key:', process.env.CF_TURNSTILE_SECRET_KEY)
		// Verify Turnstile token
		if (!process.env.CF_TURNSTILE_SECRET_KEY) {
			console.error('Missing Turnstile secret key')
			console.error('Environment variables:', process.env)
			return NextResponse.json(
				{ error: 'Server configuration error' },
				{ status: 500, headers: responseHeaders },
			)
		}

		try {
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
				console.log('Invalid CAPTCHA response:', verificationResult)
				return NextResponse.json(
					{ error: 'Invalid CAPTCHA. Please try again.' },
					{ status: 400, headers: responseHeaders },
				)
			}
		} catch (error) {
			console.error('Turnstile verification error:', error)
			return NextResponse.json(
				{ error: 'CAPTCHA verification failed. Please try again.' },
				{ status: 500, headers: responseHeaders },
			)
		}

		console.log('Sending email via Resend')
		try {
			// Send email using Resend
			const emailResponse = await resend.emails.send({
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

			if (emailResponse.error) {
				console.error('Resend API error:', emailResponse.error)
				return NextResponse.json(
					{ error: 'Failed to send email. Please try again later.' },
					{ status: 500, headers: responseHeaders },
				)
			}

			console.log('Email sent successfully:', emailResponse)
			return NextResponse.json(
				{ message: 'Email sent successfully' },
				{ status: 200, headers: responseHeaders },
			)
		} catch (error) {
			console.error('Resend API error:', error)
			return NextResponse.json(
				{ error: 'Failed to send email. Please try again later.' },
				{ status: 500, headers: responseHeaders },
			)
		}
	} catch (error) {
		console.error('Error in contact form submission:', error)
		return NextResponse.json(
			{ error: 'Error sending message' },
			{ status: 500, headers: responseHeaders },
		)
	}
}
