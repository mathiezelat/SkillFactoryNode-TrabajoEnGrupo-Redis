import jwt from 'jsonwebtoken'

const authorization = async (req, res, next) => {
	const authorization = req.headers.authorization

	if (!authorization) return res.status(403).send('Unauthorized')

	if (!authorization.startsWith('Bearer '))
		return res.status(403).send('Unauthorized')

	const token = authorization.slice(7, authorization.length)

	if (!token) return res.status(403).send('Unauthorized')

	try {
		const decodedToken = jwt.verify(token, 'secret')

		if (!decodedToken._id) return res.status(403).send('Unauthorized')

		req.user = decodedToken

		next()
	} catch (error) {
		return res.status(403).send('Unauthorized')
	}
}

export default authorization
