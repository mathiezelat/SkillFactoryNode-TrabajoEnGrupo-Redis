import { Router } from 'express'
import swapiController from '../../controllers/swapiController.js'

const route = Router()

route.get('/:param?', swapiController.getSwapi)

export default route
