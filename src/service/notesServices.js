import note from '../database/notes.js'

const getAllNotes = () => {
	const getAll = note.getAllNotes()
	return getAll
}

const getOneNote = noteId => {
	const getOne = note.getOneNote(noteId)
	return getOne
}

const createNote = newNote => {
	const createdNote = note.createNote(newNote)
	return createdNote
}

const updateNote = (noteId, newNote) => {
	const updatedNote = note.updateNote(noteId, newNote)
	return updatedNote
}

const deleteNote = noteId => {
	const deletedNote = note.deleteNote(noteId)
	return deletedNote
}

export default {
	getAllNotes,
	getOneNote,
	createNote,
	updateNote,
	deleteNote,
}
