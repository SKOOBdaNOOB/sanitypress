import { defineArrayMember, defineField, defineType } from 'sanity'
import { FaCertificate } from 'react-icons/fa'
import { PiCertificate } from 'react-icons/pi'

export default defineType({
	name: 'cert-list',
	title: 'Certifications List',
	icon: FaCertificate,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'categories',
			title: 'Cert Categories',
			icon: PiCertificate,
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Category',
					icon: PiCertificate,
					fields: [
						defineField({
							name: 'category',
							title: 'Cert Category',
							type: 'string',
							validation: (Rule) =>
								Rule.required().error('Category name is required.'),
						}),
						defineField({
							name: 'certs',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'object',
									fields: [
										defineField({
											name: 'image',
											title: 'Badge Image',
											type: 'image',
											options: { hotspot: true },
											validation: (Rule) =>
												Rule.required().error(
													'Certification badge image is required.',
												),
										}),
										defineField({
											name: 'name',
											title: 'Certification Name',
											type: 'string',
											validation: (Rule) =>
												Rule.required().error(
													'Certification name is required.',
												),
										}),
										defineField({
											name: 'link',
											title: 'Certification Link',
											type: 'url',
											validation: (Rule) =>
												Rule.uri({
													allowRelative: false,
													scheme: ['http', 'https'],
												}).error('Must be a valid URL.'),
										}),
									],
									preview: {
										select: {
											title: 'name',
											media: 'image',
										},
									},
								}),
							],
						}),
					],
					preview: {
						select: {
							title: 'category',
							certs: 'certs',
						},
						prepare: ({ title, certs }) => ({
							title: title || 'Unnamed Category',
							subtitle: `${(certs || []).length} certifications`,
						}),
					},
				}),
			],
			group: 'content',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			categories: 'categories',
		},
		prepare: ({ categories }) => ({
			title: 'Certifications',
			subtitle: `${(categories || []).length} categories`,
		}),
	},
})
