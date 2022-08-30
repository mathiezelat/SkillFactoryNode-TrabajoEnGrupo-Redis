import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		discordId: String,
		rol: {
			type: String,
			enum: ['ADMIN_ROLE', 'USER_ROLE'],
			default: 'USER_ROLE',
		},
	},
	{ versionKey: false, timestamps: true }
)

UserSchema.methods.generateHash = async password => {
	const salt = await bcrypt.genSalt(8)
	return await bcrypt.hash(password, salt)
}

UserSchema.methods.validatePassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

export default mongoose.model('User', UserSchema)
