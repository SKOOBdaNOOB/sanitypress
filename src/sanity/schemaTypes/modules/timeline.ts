import { defineType, defineField } from 'sanity'
import { TimelineIcon } from '@sanity/icons'

const timelineModule = defineType({
	name: 'timeline',
	title: 'Timeline',
	type: 'object',
	icon: TimelineIcon,
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'items',
			title: 'Timeline Items',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						defineField({
							name: 'date',
							title: 'Date',
							type: 'date',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'title',
							title: 'Event Title',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 3,
						}),
						defineField({
							name: 'image',
							title: 'Image',
							type: 'image',
							options: {
								hotspot: true,
							},
						}),
					],
				},
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: 'options',
			title: 'Options',
			type: 'module-options',
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare({ title }) {
			return {
				title: title || 'Timeline',
				subtitle: 'Timeline module',
			}
		},
	},
})

export default timelineModule
