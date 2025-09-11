import { fromVault } from 'fumadocs-obsidian'
await fromVault({
	dir: 'interview',
	out: {
		publicDir: 'public',
		contentDir: 'content/docs',
	},
})
