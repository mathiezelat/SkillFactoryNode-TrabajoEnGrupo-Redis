import { Router } from 'express'
import authController from '../../controllers/authController.js'
import { isAuth, isNotAuthDiscord } from '../../middlewares/authorization.js'

const route = Router()

route
	.get('/discord', isNotAuthDiscord, authController.discordAuthenticate)
	.get('/redirect', authController.discordRedirect)
	.get('/discord/logout', authController.discordLogout)
	.get('/discord/dashboard', isAuth, authController.discordDashboard)
	.post('/login', authController.login)
	.post('/register', authController.register)

export default route
