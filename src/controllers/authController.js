import auth from './../auth/jwt.js'

const login = async (req, res) => {
	const { username, password } = req.body

	try {
		const token = await auth.login(username, password)

		res.status(200).json({
			token,
		})
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		})
	}
}

const register = async (req, res) => {
	const { username, password } = req.body

	try {
		const token = await auth.register(username, password)

		res.status(200).json({
			token,
		})
	} catch (error) {
		res.status(400).json({
			msg: error.message,
		})
	}
}

export default {
	login,
	register,
}
