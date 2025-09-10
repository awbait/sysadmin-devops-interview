// 'use client'
// import { liteClient } from 'algoliasearch/lite'
// import { useDocsSearch } from 'fumadocs-core/search/client'
// import {
// 	SearchDialog,
// 	SearchDialogClose,
// 	SearchDialogContent,
// 	SearchDialogFooter,
// 	SearchDialogHeader,
// 	SearchDialogIcon,
// 	SearchDialogInput,
// 	SearchDialogList,
// 	SearchDialogOverlay,
// 	type SharedProps,
// } from 'fumadocs-ui/components/dialog/search'
// import { useI18n } from 'fumadocs-ui/contexts/i18n'
// const appId = 'H19KE789GR'
// const apiKey = '1d869421af882624ccda3b8fbb85a776'
// const client = liteClient(appId, apiKey)
// export default function CustomSearchDialog(props: SharedProps) {
// 	const { locale } = useI18n() // (optional) for i18n
// 	const { search, setSearch, query } = useDocsSearch({
// 		type: 'algolia',
// 		client,
// 		indexName: 'document',
// 		locale,
// 	})
// 	console.log(query.data)
// 	return (
// 		<SearchDialog
// 			search={search}
// 			onSearchChange={setSearch}
// 			isLoading={query.isLoading}
// 			{...props}
// 		>
// 			<SearchDialogOverlay />
// 			<SearchDialogContent>
// 				<SearchDialogHeader>
// 					<SearchDialogIcon />
// 					<SearchDialogInput />
// 					<SearchDialogClose />
// 				</SearchDialogHeader>
// 				<SearchDialogList items={query.data !== 'empty' ? query.data : null} />
// 				<SearchDialogFooter>
// 					<a
// 						href='https://algolia.com'
// 						rel='noreferrer noopener'
// 						className='ms-auto text-xs text-fd-muted-foreground'
// 					>
// 						Search powered by Algolia
// 					</a>
// 				</SearchDialogFooter>
// 			</SearchDialogContent>
// 		</SearchDialog>
// 	)
// }

'use client'

import { OramaClient } from '@oramacloud/client'
import { useDocsSearch } from 'fumadocs-core/search/client'
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogFooter,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogOverlay,
	type SharedProps,
} from 'fumadocs-ui/components/dialog/search'
import { useI18n } from 'fumadocs-ui/contexts/i18n'

const client = new OramaClient({
	endpoint: 'https://cloud.orama.run/v1/indexes/interview-bo8mff',
	api_key: 'xmAQQlwcEnWV40Qa31MpJTOMgwJKXKOT',
	telemetry: false,
})

export default function CustomSearchDialog(props: SharedProps) {
	const { locale } = useI18n() // (optional) for i18n
	const { search, setSearch, query } = useDocsSearch({
		type: 'orama-cloud',
		client,
		locale,
	})

	return (
		<SearchDialog
			search={search}
			onSearchChange={setSearch}
			isLoading={query.isLoading}
			{...props}
		>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList items={query.data !== 'empty' ? query.data : null} />
				<SearchDialogFooter>
					<a
						href='https://orama.com'
						rel='noreferrer noopener'
						className='ms-auto text-xs text-fd-muted-foreground'
					>
						Search powered by Orama
					</a>
				</SearchDialogFooter>
			</SearchDialogContent>
		</SearchDialog>
	)
}
