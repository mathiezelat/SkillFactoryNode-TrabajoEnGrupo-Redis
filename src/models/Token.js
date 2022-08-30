import mongoose from 'mongoose'

const TokenSchema = new mongoose.Schema(
	{
		token: String,
		userId: String,
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

export default mongoose.model('Token', TokenSchema)
