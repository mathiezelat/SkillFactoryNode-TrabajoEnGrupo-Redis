import Note from '../models/Note.js'

import { client } from '../redis/client.js'

const getAllNotes = async () => {
	const getAllRedis = await client.get('notes')

	if (getAllRedis) return JSON.parse(getAllRedis)

	const getAll = await Note.find().populate('user')

	await client.set('notes', JSON.stringify(getAll), {
		EX: 240,
	})

	return getAll
}

const getOneNote = async noteId => {
	const getOneRedis = await client.get(noteId)

	if (getOneRedis) return JSON.parse(getOneRedis)

	const getOne = await Note.findById(noteId).populate('user')

	await client.set(noteId, JSON.stringify(getOne), {
		EX: 240,
	})

	return getOne
}

const createNote = async newNote => {
	const createdNote = await Note.create(newNote)
	return createdNote
}

const updateNote = async (noteId, updateNote) => {
	const updatedNote = await Note.findByIdAndUpdate(noteId, updateNote)
	return updatedNote
}

const deleteNote = async noteId => {
	const deletedNote = await Note.findByIdAndDelete(noteId)
	return deletedNote
}

export default {
	getAllNotes,
	getOneNote,
	createNote,
	updateNote,
	deleteNote,
}
