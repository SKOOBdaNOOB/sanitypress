import { Octokit } from 'octokit'
import { stegaClean } from 'next-sanity'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

export default async function getGithubProfile(
	githubDetails?: Sanity.GitHubDetails,
) {
	if (!githubDetails) {
		return {
			profile: {
				avatarUrl: '',
				name: 'Unknown User',
				bio: null,
				htmlUrl: '',
			},
			repositories: [],
		}
	}

	const username = String(stegaClean(githubDetails.username))
	const limit = Number(stegaClean(githubDetails.limit))
	const sort = stegaClean(githubDetails.sort)

	try {
		const { data: profile } = await octokit.rest.users.getByUsername({
			username,
		})

		const { data: repos } = await octokit.rest.repos.listForUser({
			username,
			per_page: limit,
			sort: sort === 'updated' ? 'updated' : 'created',
		})

		return {
			profile: {
				avatarUrl: profile.avatar_url,
				name: profile.name || username,
				bio: profile.bio,
				htmlUrl: profile.html_url,
			},
			repositories: repos.map((repo) => ({
				name: repo.name,
				description: repo.description || '',
				htmlUrl: repo.html_url,
				stars: repo.stargazers_count || 0,
			})),
		}
	} catch (error) {
		console.error('Issue fetching GitHub data', error)
		return {
			profile: {
				avatarUrl: '',
				name: 'Unknown User',
				bio: null,
				htmlUrl: '',
			},
			repositories: [],
		}
	}
}
