import { source } from '@/lib/source'
import { getMDXComponents } from '@/mdx-components'
import { getGithubLastEdit } from 'fumadocs-core/server'
import { InlineTOC } from 'fumadocs-ui/components/inline-toc'
import { createRelativeLink } from 'fumadocs-ui/mdx'
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
} from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

function CustomLastUpdate({ date }: { date: Date }) {
	const formatDate = (date: Date) => {
		const day = date.getDate()
		const year = date.getFullYear()
		const hours = date.getHours()
		const minutes = date.getMinutes()
		const seconds = date.getSeconds()

		// Массив сокращенных названий месяцев на русском
		const monthNames = [
			'янв.',
			'февр.',
			'мар.',
			'апр.',
			'май',
			'июн.',
			'июл.',
			'авг.',
			'сент.',
			'окт.',
			'нояб.',
			'дек.',
		]

		const month = monthNames[date.getMonth()]

		// Форматируем время с секундами
		const timeString = `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

		return `${day} ${month} ${year} г., ${timeString}`
	}

	return (
		<p className='text-sm text-fd-muted-foreground'>
			Последнее обновление {formatDate(date)}
		</p>
	)
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	const MDXContent = page.data.body

	const time = await getGithubLastEdit({
		owner: 'awbait',
		repo: 'sysadmin-devops-interview',
		path: `content/docs/${page.path}`,
	})
	console.log(time)

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			tableOfContent={{ style: 'clerk' }}
		>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<a
				href={`https://github.com/awbait/sysadmin-devops-interview/blob/main/content/docs/${page.path}`}
				rel='noreferrer noopener'
				target='_blank'
				className='w-fit border rounded-xl p-2 font-medium text-sm text-fd-secondary-foreground bg-fd-secondary transition-colors hover:text-fd-accent-foreground hover:bg-fd-accent'
			>
				Редактировать на GitHub
			</a>

			<div className='not-prose my-6'>
				<InlineTOC defaultOpen={true} items={page.data.toc}>
					Оглавление
				</InlineTOC>
			</div>

			<DocsBody>
				<MDXContent
					components={getMDXComponents({
						// this allows you to link to other pages with relative file paths
						a: createRelativeLink(source, page),
					})}
				/>
			</DocsBody>

			{/* Кастомный компонент даты - отображается только если есть дата */}
			{time && <CustomLastUpdate date={time} />}
		</DocsPage>
	)
}

export async function generateStaticParams() {
	return source.generateParams()
}

export async function generateMetadata(
	props: PageProps<'/docs/[[...slug]]'>
): Promise<Metadata> {
	const params = await props.params
	const page = source.getPage(params.slug)
	if (!page) notFound()

	return {
		title: page.data.title,
		description: page.data.description,
	}
}
