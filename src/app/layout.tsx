import '@/app/global.css'
import SearchDialog from '@/components/search'
import { i18n } from '@/lib/i18n'
import { defineI18nUI } from 'fumadocs-ui/i18n'
import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'

const inter = Inter({
	subsets: ['latin'],
})

const { provider } = defineI18nUI(i18n, {
	translations: {
		ru: {
			displayName: 'Русский',
			search: 'Поиск',
			searchNoResult: 'string',
			toc: 'Оглавление',
			tocNoHeadings: 'Оглавление не найдено',
			lastUpdate: 'Последнее обновление',
			chooseLanguage: 'Выбрать язык',
			nextPage: 'Следующая страница',
			previousPage: 'Предыдущая страница',
			chooseTheme: 'Выбрать тему',
			editOnGithub: 'Редактировать на GitHub',
		},
		en: {
			displayName: 'English',
		},
	},
})

export default function Layout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='ru' className={inter.className} suppressHydrationWarning>
			<body className='flex flex-col min-h-screen' cz-shortcut-listen='true'>
				<RootProvider
					search={{
						SearchDialog,
					}}
					i18n={provider('ru')}
				>
					{children}
				</RootProvider>
			</body>
		</html>
	)
}
