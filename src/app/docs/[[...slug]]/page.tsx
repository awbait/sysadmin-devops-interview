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

	return (
		<DocsPage
			toc={page.data.toc}
			full={page.data.full}
			lastUpdate={time ?? undefined}
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
