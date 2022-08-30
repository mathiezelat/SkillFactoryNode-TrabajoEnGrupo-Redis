import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

export default mongoose.model('Note', NoteSchema)
