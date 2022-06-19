import mongoose from 'mongoose';

const BossSchema = mongoose.Schema(
	{
		user_id:{
			type:mongoose.Schema.ObjectId
		}

	}
)
const WorkerSchema = mongoose.Schema(
	{
		user_id:{
			type:mongoose.Schema.ObjectId
		},

	}
)
const UserSchema = mongoose.Schema(
	{
		email:{
			type: String,
			required: true
		},
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
		},
		skills:{
			type:[String]
		},
		bosses:{
			type:[BossSchema]
		},
		workers:{
			type:[WorkerSchema]
		}
	}
);

export const User = mongoose.model('User', UserSchema);
export const Boss = mongoose.model('Boss', BossSchema);
export const Worker = mongoose.model('Worker', WorkerSchema);