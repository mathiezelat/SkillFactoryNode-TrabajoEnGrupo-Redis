import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		rol: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
		notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
	},
	{ versionKey: false }
)

UserSchema.methods.generateHash = async password => {
	const salt = await bcrypt.genSalt(8)
	return await bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)
