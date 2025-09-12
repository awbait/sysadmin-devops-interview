import { docs } from '@/.source'
import { loader } from 'fumadocs-core/source'
import { icons as lucideIcons } from 'lucide-react'
import { createElement } from 'react'
import * as simpleIcons from 'react-icons/si'

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
	baseUrl: '/docs',

	source: docs.toFumadocsSource(),
	icon(icon) {
		if (!icon) {
			// вернём дефолт, например, папку из lucide
			return
		}

		// lucide
		if (icon in lucideIcons) {
			return createElement(lucideIcons[icon as keyof typeof lucideIcons])
		}

		// simple-icons (react-icons/si)
		if (icon in simpleIcons) {
			return createElement(simpleIcons[icon as keyof typeof simpleIcons])
		}

		return null
	},
})
