import { Router } from 'express'
import authController from '../../controllers/authController.js'

const route = Router()

route
	.post('/login', authController.login)
	.post('/register', authController.register)

export default route
