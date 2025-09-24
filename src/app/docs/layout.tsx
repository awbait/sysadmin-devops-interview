import { Badge } from '@/components/ui/badge'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'

// === NEW: обойти дерево навигации и подменить label/title
type TreeNode = {
	title?: string
	label?: ReactNode
	children?: TreeNode[]
	[k: string]: any
}

function mapTree<T extends TreeNode>(node: T, fn: (n: T) => T): T {
	const n2 = fn({ ...node })
	if (n2.children?.length) {
		n2.children = n2.children.map((c: any) => mapTree(c, fn))
	}
	return n2
}

export default function Layout({ children }: LayoutProps<'/docs'>) {
	// source.pageTree — готовое дерево от Fumadocs
	const treeWithBadges = mapTree(source.pageTree as any, n => {
		if (typeof n.name !== 'string') return n

		const m = n.name.match(/\s*\((soon|new|update)\)\s*$/i)
		if (!m) return n

		const tag = m[1].toLowerCase() as 'soon' | 'new' | 'update'
		const clean = n.name.replace(m[0], '').trimEnd()
		const key = `name-${n.url ?? n.href ?? clean}`

		const labelMap = { soon: 'Soon', new: 'New', update: 'Update' } as const

		// базовые классы для малого бейджа
		const base = 'px-1.5 py-0 text-[10px] leading-[14px] rounded-full border-0'

		// цвета под каждый тег
		const badgeClassMap: Record<typeof tag, string> = {
			soon: `${base} bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100`,
			new: `${base} bg-emerald-600 text-white hover:bg-emerald-600/90`,
			update: `${base} bg-blue-600 text-white hover:bg-blue-600/90`,
		}

		return {
			...n,
			name: (
				<span key={key} className='inline-flex items-center gap-1.5'>
					<span>{clean}</span>
					<Badge className={badgeClassMap[tag]}>{labelMap[tag]}</Badge>
				</span>
			),
		}
	})

	return (
		<DocsLayout tree={treeWithBadges as any} {...baseOptions()}>
			{children}
		</DocsLayout>
	)
}
