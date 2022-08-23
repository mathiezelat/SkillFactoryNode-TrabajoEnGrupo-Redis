import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { client } from './redis/client.js'

import v1AuthRoute from './v1/routes/auth.js'
import v1SwapiRoute from './v1/routes/swapi.js'

const PORT = process.env.PORT || 3000

dotenv.config()

const app = express()

app.use(express.json())
app.use(morgan('dev'))

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
