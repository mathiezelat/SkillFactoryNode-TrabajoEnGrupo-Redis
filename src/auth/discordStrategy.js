import { Strategy as DiscordStrategy } from 'passport-discord'
import passport from 'passport'

import {
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_CLIENT_REDIRECT,
} from '../config.js'

import User from '../models/User.js'

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	if (user) done(null, user)
})

passport.use(
	new DiscordStrategy(
		{
			clientID: DISCORD_CLIENT_ID,
			clientSecret: DISCORD_CLIENT_SECRET,
			callbackURL: DISCORD_CLIENT_REDIRECT,
			scope: ['identify'],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await User.findOne({ discordId: profile.id })

				if (user) return done(null, user)

				const newUser = new User({
					discordId: profile.id,
					username: profile.username,
				})

				const savedUser = await newUser.save()

				done(null, savedUser)
			} catch (error) {
				console.log(error)
				done(error, null)
			}
		}
	)
)
