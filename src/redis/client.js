import { createClient } from 'redis'

export const client = createClient({
	host: 'localhost',
	post: 6379,
})
