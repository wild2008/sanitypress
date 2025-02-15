import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscFileMedia } from 'react-icons/vsc'
import TextInputWithPresets, {
	getPreset,
	type Preset,
} from '@/sanity/ui/TextInputWithPresets'
import { count } from '@/lib/utils'

const presets: Preset[] = [
	{ label: 'Tablet and below', value: '(width < 48rem)' },
	{ label: 'Mobile only', value: '(width < 24rem)' },
	{ label: 'Dark mode', value: '(prefers-color-scheme: dark)' },
]

export default defineType({
	name: 'img',
	title: 'Image',
	type: 'object',
	icon: VscFileMedia,
	fieldsets: [{ name: 'options', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'image',
			title: 'Default image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'responsive',
			title: 'Responsive images',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'media',
							title: 'Media query',
							type: 'string',
							placeholder: `e.g. ${presets.map((p) => getPreset(p)).join(', ')}`,
							validation: (Rule) => Rule.required(),
							initialValue: getPreset(presets[0]),
							components: {
								input: (props) => (
									<TextInputWithPresets
										prefix="@media"
										presets={presets}
										{...props}
									/>
								),
							},
						}),
					],
					preview: {
						select: {
							title: 'media',
							media: 'image',
						},
					},
				}),
			],
		}),
		defineField({
			name: 'alt',
			title: 'Alt text',
			type: 'string',
			fieldset: 'options',
		}),
		defineField({
			name: 'loading',
			type: 'string',
			options: {
				list: ['lazy', 'eager'],
				layout: 'radio',
			},
			initialValue: 'lazy',
			fieldset: 'options',
		}),
	],
	preview: {
		select: {
			image: 'image',
			responsive: 'responsive',
			alt: 'alt',
		},
		prepare: ({ image, responsive, alt }) => ({
			title: alt,
			subtitle: responsive && count(responsive, 'responsive image'),
			media: image,
		}),
	},
})
