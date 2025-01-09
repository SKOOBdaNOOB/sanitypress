import { defineField, defineType } from 'sanity'
import { VscMail } from 'react-icons/vsc'

export default defineType({
	name: 'contactForm',
	title: 'Contact Form',
	icon: VscMail,
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'emailTo',
			title: 'Email To',
			type: 'string',
			description: 'Email address where form submissions will be sent',
			validation: (Rule) => Rule.email().required(),
		}),
		defineField({
			name: 'successMessage',
			title: 'Success Message',
			type: 'string',
			description: 'Message shown after successful form submission',
			validation: (Rule) => Rule.required(),
			initialValue: 'Thank you for reaching out. I will get back to you soon!',
		}),
		defineField({
			name: 'fields',
			title: 'Form Fields',
			type: 'object',
			validation: (Rule) => Rule.required(),
			initialValue: {
				nameLabel: 'Name',
				emailLabel: 'Email',
				subjectLabel: 'Subject',
				messageLabel: 'Message',
				submitLabel: 'Send Message',
			},
			fields: [
				defineField({
					name: 'nameLabel',
					title: 'Name Field Label',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'emailLabel',
					title: 'Email Field Label',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'subjectLabel',
					title: 'Subject Field Label',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'messageLabel',
					title: 'Message Field Label',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'submitLabel',
					title: 'Submit Button Label',
					type: 'string',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => ({
			title: title || 'Contact Form',
			subtitle: 'Contact Form',
		}),
	},
})
