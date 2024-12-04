'use client'

import { useState, useEffect } from 'react'
import getGithubProfile from '@/lib/getGithubProfile'
import { HoverEffect } from '@/ui/components/CardHoverEffect'

export default function GitHubHero({
	githubDetails,
}: {
	githubDetails: Sanity.GitHubDetails
}) {
	const [data, setData] = useState<{
		profile: {
			avatarUrl: string
			name: string
			bio: string | null
			htmlUrl: string
		}
		repositories: {
			name: string
			description: string
			htmlUrl: string
			stars: number
		}[]
	} | null>(null)

	const [loading, setLoading] = useState(true)

	// Fetch GitHub data on component mount
	useEffect(() => {
		getGithubProfile(githubDetails).then((profileData) => {
			if (profileData) {
				setData(profileData)
			} else {
				setData(null)
			}
		})
	}, [githubDetails])

	// Show skeleton loader while data is being fetched
	if (loading) {
		return (
			<div className="flex flex-col gap-4">
				<div className="skeleton h-24 w-24 rounded-full"></div>
				<div className="skeleton h-4 w-40"></div>
				<div className="skeleton h-4 w-60"></div>
			</div>
		)
	}

	// Handle case where data fetching fails
	if (!data) {
		return <p className="text-red-500">Failed to load GitHub profile data.</p>
	}

	// Render profile and repositories
	return (
		<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
			{/* Left: Profile Section */}
			<div className="flex flex-col items-center lg:items-start">
				<img
					src={data.profile.avatarUrl}
					alt={data.profile.name}
					className="h-24 w-24 rounded-full"
				/>
				<h1 className="mt-4 text-2xl font-bold">{data.profile.name}</h1>
				<p className="mt-2 text-sm text-gray-600">{data.profile.bio}</p>
				<a
					href={data.profile.htmlUrl}
					target="_blank"
					className="mt-4 text-blue-500 underline"
					rel="noopener noreferrer"
				>
					View GitHub Profile
				</a>
			</div>

			{/* Right: Repository Section */}
			<HoverEffect
				items={data.repositories.map((repo) => ({
					title: repo.name,
					description: `${repo.description || 'No description provided'} ⭐ ${
						repo.stars
					} stars`,
					link: repo.htmlUrl,
				}))}
				className="gap-6"
			/>
		</div>
	)
}
