import jwt from 'jsonwebtoken'

import { SECRET_OR_PRIVATE_KEY } from '../config.js'

const isAuth = async (req, res, next) => {
	if (req.user) {
		next()
	} else {
		const authorization = req.headers.authorization

		if (!authorization) return res.status(403).send('Unauthorized')

		if (!authorization.startsWith('Bearer '))
			return res.status(403).send('Unauthorized')

		const token = authorization.slice(7, authorization.length)

		if (!token) return res.status(403).send('Unauthorized')

		try {
			const decodedToken = jwt.verify(token, SECRET_OR_PRIVATE_KEY)

			if (!decodedToken.id) return res.status(403).send('Unauthorized')

			req.user = decodedToken

			next()
		} catch (error) {
			return res.status(403).send('Unauthorized')
		}
	}
}

// const isAuthorizedDiscord = (req, res, next) => {
// 	if (req.user) {
// 		next()
// 	} else {
// 		res.redirect('/api/v1/auth/discord')
// 	}
// }

const isNotAuthDiscord = (req, res, next) => {
	if (req.user) {
		res.redirect('/api/v1/auth/discord/dashboard')
	} else {
		next()
	}
}

export { isAuth, isNotAuthDiscord }
