import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		versionKey: false,
	}
)

export default mongoose.model('Note', NoteSchema)
