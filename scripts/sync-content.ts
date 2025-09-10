import { CloudManager } from '@oramacloud/client'
import { sync, type OramaDocument } from 'fumadocs-core/search/orama-cloud'
import * as fs from 'node:fs/promises'

// the path of pre-rendered `static.json`, choose one according to your React framework
const filePath = {
	next: '.next/server/app/static.json.body',
	'tanstack-start': '.output/public/static.json',
	'react-router': 'build/client/static.json',
}['next']

async function main() {
	// private API key
	const apiKey = process.env.ORAMA_PRIVATE_API_KEY
	console.log(apiKey)

	if (!apiKey) {
		console.log('no api key for Orama found, skipping')
		return
	}

	const content = await fs.readFile(filePath)
	const records = JSON.parse(content.toString()) as OramaDocument[]
	const manager = new CloudManager({ api_key: apiKey })

	await sync(manager, {
		index: 'afdl78y6jkquftb4c221d103',
		documents: records,
	})

	console.log(`search updated: ${records.length} records`)
}

void main()
