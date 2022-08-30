import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'

import { PORT } from './config.js'

import { client } from './redis/client.js'

import v1AuthRoute from './v1/routes/auth.js'
import v1SwapiRoute from './v1/routes/swapi.js'

const app = express()

import './auth/discordStrategy.js'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(
	session({
		secret: 'secret',
		cookie: {
			maxAge: 60000 * 60 * 42,
		},
		saveUninitialized: false,
		resave: false,
		name: 'NN',
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/auth', v1AuthRoute)
app.use('/api/v1/swapi', v1SwapiRoute)

const main = async () => {
	try {
		await client.connect()

		console.log('Connected to redis')

		await mongoose.connect(process.env.MONGO_KEY, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log('Connected to database')
	} catch (error) {
		console.log(error)
	}

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`)
	})
}

main()
