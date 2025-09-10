import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			title: (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='#ffffff'
					>
						<g fill='none'>
							<circle
								cx='12'
								cy='12'
								r='10'
								stroke='#ffffff'
								strokeWidth='1.5'
							/>
							<path
								stroke='#ffffff'
								strokeLinecap='round'
								strokeWidth='1.5'
								d='M10.125 8.875a1.875 1.875 0 1 1 2.828 1.615c-.475.281-.953.708-.953 1.26V13'
							/>
							<circle cx='12' cy='16' r='1' fill='#ffffff' />
						</g>
					</svg>
					Interview Questions
				</>
			),
		},
		// see https://fumadocs.dev/docs/ui/navigation/links
		links: [],
		githubUrl: 'https://github.com/awbait/sysadmin-devops-interview',
	}
}
