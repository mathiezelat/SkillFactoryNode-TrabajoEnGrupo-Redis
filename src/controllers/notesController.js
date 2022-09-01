import notesServices from '../service/notesServices.js'

const getAllNotes = async (req, res) => {
	const getAll = await notesServices.getAllNotes()

	res.status(200).json({
		data: getAll,
	})
}

const getOneNote = async (req, res) => {
	const { noteId } = req.params

	const getOne = await notesServices.getOneNote(noteId)

	res.status(200).json({
		data: getOne,
	})
}

const createNote = async (req, res) => {
	const { title, content, user } = req.body

	if ((!title, !content, !user)) {
		return res.status(400).json({
			msg: 'Title, content and user fields are required',
		})
	}

	const newNote = {
		title,
		content,
		user,
	}

	const createdNote = await notesServices.createNote(newNote)

	res.status(200).json({
		data: createdNote,
	})
}

const updateNote = async (req, res) => {
	const { noteId } = req.params
	const { title, content, user } = req.body

	if ((!title, !content, !user)) {
		return res.status(400).json({
			msg: 'Title, content and user fields are required',
		})
	}

	const updateNote = {
		title,
		content,
		user,
	}

	await notesServices.updateNote(noteId, updateNote)

	res.status(200).json({
		msg: 'Successfully updated note',
	})
}

const deleteNote = async (req, res) => {
	const { noteId } = req.params

	await notesServices.deleteNote(noteId)

	res.status(200).json({
		msg: 'Successfully deleted note',
	})
}

export default {
	getAllNotes,
	getOneNote,
	createNote,
	updateNote,
	deleteNote,
}
