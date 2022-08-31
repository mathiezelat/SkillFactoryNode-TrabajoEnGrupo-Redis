import passport from 'passport'
import auth from './../auth/jwt.js'

const login = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		res.status(400).json({
			msg: 'Username and password fields are required ',
		})
	}

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

	if (!username || !password) {
		res.status(400).json({
			msg: 'Username and password fields are required',
		})
	}

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

const discordAuthenticate = passport.authenticate('discord')

const discordRedirect = passport.authenticate('discord', {
	failureRedirect: '/api/v1/auth/discord',
	successRedirect: '/api/v1/auth/discord/dashboard',
})

const discordLogout = (req, res) => {
	if (req.user) {
		req.logout(error => {
			if (error) console.log(error)
			res.redirect('/api/v1/auth/discord')
		})
	}
}

const discordDashboard = (req, res) => {
	res.status(200).json({ user: req.user })
}

export default {
	login,
	register,
	discordAuthenticate,
	discordRedirect,
	discordLogout,
	discordDashboard,
}
