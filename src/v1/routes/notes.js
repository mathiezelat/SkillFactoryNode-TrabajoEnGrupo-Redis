import { Router } from 'express'

import notesController from '../../controllers/notesController.js'
import { isAuth } from '../../middlewares/authorization.js'

const route = Router()

route
	.get('/', notesController.getAllNotes)
	.get('/:noteId', notesController.getOneNote)
	.post('/', isAuth, notesController.createNote)
	.put('/:noteId', isAuth, notesController.updateNote)
	.delete('/:noteId', isAuth, notesController.deleteNote)

export default route
