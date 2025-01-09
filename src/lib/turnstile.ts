export async function validateToken(token: string): Promise<boolean> {
	if (!process.env.CF_TURNSTILE_SECRET_KEY) {
		return false
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
		return verificationResult.success
	} catch (error) {
		console.error('Token validation error:', error)
		return false
	}
}
