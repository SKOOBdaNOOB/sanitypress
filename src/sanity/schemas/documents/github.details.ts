import { defineType, defineField } from 'sanity'
import { FaGithub } from 'react-icons/fa6'

// Ability to add personal GitHub username and repo fetch limit for custom module

const githubDetails = defineType({
	name: 'github.details',
	title: 'GitHub Details',
	icon: FaGithub,
	type: 'document',
	fields: [
		defineField({
			name: 'username',
			title: 'GitHub Username',
			type: 'string',
			description:
				"Add Username of the GitHub profile that you'd like to fetch data from",
			placeholder: 'SKOOBdaNOOB',
			validation: (Rule) =>
				Rule.required().error('GitHub username is required'),
		}),
		defineField({
			name: 'limit',
			title: 'GitHub Repo Limit',
			type: 'number',
			description:
				'Set a limit on how many Repositories should be fetched from GitHub',
			initialValue: 3,
			validation: (Rule) => Rule.min(1).max(10),
		}),
		defineField({
			name: 'sort',
			title: 'Repo Sort Order',
			type: 'string',
			description:
				'Sort your fetched repos by recently updated, star count, or fork count',
			options: {
				list: [
					{ title: 'Recently Updated', value: 'updated' },
					{ title: 'Recently Created', value: 'created' },
				],
			},
			initialValue: 'updated',
		}),
	],
	preview: {
		select: {
			username: 'username',
			limit: 'limit',
		},
		prepare: ({ username, limit }) => ({
			title: username || 'No Username Provided',
			subtitle: `Repo Limit: ${limit || 3}`,
		}),
	},
})

export default githubDetails
