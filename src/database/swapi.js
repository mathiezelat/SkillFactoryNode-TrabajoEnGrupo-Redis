import axios from 'axios'

import { client } from './../redis/client.js'

const SWAPI_URL = 'https://swapi.dev/api/'

const getSwapi = async param => {
	const reply = await client.get(param)

	if (reply) return JSON.parse(reply)

	const response = await axios.get(`${SWAPI_URL}/${param}`)

	await client.set(param, JSON.stringify(response.data), {
		EX: 240,
	})

	return response.data
}

export default {
	getSwapi,
}
