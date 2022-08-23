import swapiService from '../service/swapiService.js'

const getSwapi = async (req, res) => {
	const { param = '' } = req.params

	if (
		param !== 'people' &&
		param !== 'films' &&
		param !== 'starships' &&
		param !== 'vehicles' &&
		param !== 'species' &&
		param !== 'planets' &&
		param !== ''
	) {
		return res.status(400).send('Parámetro inválido')
	}

	try {
		const result = await swapiService.getSwapi(param)

		res.status(200).json(result)
	} catch (error) {
		res.status(500).send('Internal Server Error')
	}
}

export default {
	getSwapi,
}
