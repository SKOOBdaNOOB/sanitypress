import { defineArrayMember, defineField, defineType } from 'sanity'
import { FaTimeline } from 'react-icons/fa6'
import { getBlockText } from '@/sanity/lib/utils'

// A custom module designed utilizing the Aceternity UI Timeline component

export default defineType({
	name: 'timeline',
	title: 'Timeline',
	icon: FaTimeline,
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'events',
			title: 'Timeline Events',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					icon: FaTimeline,
					fields: [
						{
							name: 'event',
							title: 'Event',
							type: 'array',
							of: [{ type: 'block' }],
						},
						{
							name: 'description',
							title: 'Description',
							type: 'array',
							of: [{ type: 'block' }],
						},
						{
							name: 'date',
							title: 'Date',
							type: 'date',
						},
						{
							name: 'image',
							title: 'Image',
							type: 'image',
							options: { hotspot: true },
						},
					],
					preview: {
						select: {
							event: 'event',
						},
						prepare: ({ event }) => ({
							title: getBlockText(event),
							subtitle: 'Timeline event',
						}),
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Timeline intro',
		}),
	},
})
