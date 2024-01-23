import { PortableText } from '@portabletext/react'

export default function FAQList({ content, items }: Props) {
	return (
		<section
			className="section"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<header className="richtext">
				<PortableText value={content} />
			</header>

			{items?.map(({ question, answer }, key) => (
				<details
					itemScope
					itemProp="mainEntity"
					itemType="https://schema.org/Question"
					key={key}
				>
					<summary itemProp="name">{question}</summary>

					<div
						className="anim-fade-to-b"
						itemScope
						itemProp="acceptedAnswer"
						itemType="https://schema.org/Answer"
					>
						<div itemProp="text">
							<PortableText value={answer} />
						</div>
					</div>
				</details>
			))}
		</section>
	)
}

type Props = Partial<{
	content: any
	items: {
		question: string
		answer: any
	}[]
}>
