import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const login = async (username, password) => {
	const user = await User.findOne({ username })

	if (!user) {
		return new Error('User not exists')
	}

	const isPasswordCorrect = await user.validatePassword(password)

	if (!isPasswordCorrect) {
		return new Error('Password incorrect')
	}

	const userToken = {
		id: user._id,
		username: user.username,
	}

	const token = jwt.sign(userToken, 'secret', { expiresIn: '7m' })

	return token
}

const register = async (username, password) => {
	const createUser = new User()

	createUser.username = username

	createUser.password = await createUser.generateHash(password)

	const savedUser = await createUser.save()

	const userToken = {
		id: savedUser._id,
		username: savedUser.username,
	}

	const token = jwt.sign(userToken, 'secret', { expiresIn: '7m' })

	return token
}

export default {
	login,
	register,
}
