import jwt from 'jsonwebtoken'

import { client } from '../redis/client.js'
import { SECRET_OR_PRIVATE_KEY } from '../config.js'

import User from '../models/User.js'
import Token from '../models/Token.js'

const login = async (username, password) => {
	const user = await User.findOne({ username })

	if (!user) {
		return new Error('User not exists')
	}

	const objectIdString = user._id.toString()

	const isPasswordCorrect = await user.validatePassword(password)

	if (!isPasswordCorrect) {
		return new Error('Password incorrect')
	}

	const getTokenRedis = await client.get(objectIdString)

	if (getTokenRedis) return getTokenRedis

	const getTokenDb = await Token.findOne({ userId: user._id })

	if (getTokenDb) {
		await client.set(user._id, getTokenDb.token, {
			EX: 240,
		})

		return getTokenDb.token
	}

	const userToken = {
		id: user._id,
		username: user.username,
	}

	const token = jwt.sign(userToken, SECRET_OR_PRIVATE_KEY)

	await client.set(objectIdString, token, {
		EX: 240,
	})

	await Token.create({
		token,
		userId: objectIdString,
	})

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

	const token = jwt.sign(userToken, SECRET_OR_PRIVATE_KEY)

	const objectIdString = savedUser._id.toString()

	await client.set(objectIdString, token, {
		EX: 240,
	})

	await Token.create({
		token,
		userId: objectIdString,
	})

	return token
}

export default {
	login,
	register,
}
