import dotenv from 'dotenv'

dotenv.config()

export const {
	PORT = 3000,
	SECRET_OR_PRIVATE_KEY = 'secret',
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_CLIENT_REDIRECT,
} = process.env
