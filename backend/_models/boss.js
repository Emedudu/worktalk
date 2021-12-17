import mongoose from 'mongoose';

const BossSchema = mongoose.Schema(
	{
		name:{
			type: String,
			required: true
		},
		password:{
			type: String,
			required: true
		},
		location:{
			type: [String],
			required: true
		}
	}
);

const Boss = mongoose.model('Boss', BossSchema);

export default Boss;