import mongoose from 'mongoose';

const OrganizationSchema=mongoose.Schema(
	{
		name:{
			type: String
		},
		description:{
			type: String
		},
		creator:{
			type: mongoose.Schema.ObjectId
		},
		owner:{
			type: mongoose.Schema.ObjectId
		},
		passCode:{
			type: String
		},
		skillPool:{
			type: [String]
		},
		allMembers:{
			type:[mongoose.Schema.ObjectId]
		},
		level0:{
			type: [mongoose.Schema.ObjectId]
		},
		level1:{
			type: [mongoose.Schema.ObjectId]
		},
		level2:{
			type: [mongoose.Schema.ObjectId]
		},
		level3:{
			type: [mongoose.Schema.ObjectId]
		},
		level4:{
			type: [mongoose.Schema.ObjectId]
		},
		level5:{
			type: [mongoose.Schema.ObjectId]
		},
		timestamp:{
			type: Number
		}
	}
)
const MessageSchema=mongoose.Schema(
	{
		from:{
			type: mongoose.Schema.ObjectId,
		},
		to:{
			type: [mongoose.Schema.ObjectId]
		},
		message:{
			type: String
		},
		group:{
			type: Boolean
		},
		timestamp:{
			type: Number
		}
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
		skills:{
			type:[String]
		},
		organizations:{
			type:[mongoose.Schema.ObjectId]
		},
		timestamp:{
			type: Number
		}
	}
);

export const User = mongoose.model('User', UserSchema);
export const Organization = mongoose.model('Organization', OrganizationSchema);
export const Message = mongoose.model('Message', MessageSchema);