import swapi from '../database/swapi.js'

const getSwapi = param => {
	return swapi.getSwapi(param)
}

export default {
	getSwapi,
}
