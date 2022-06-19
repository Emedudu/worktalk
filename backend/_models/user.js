import mongoose from 'mongoose';

const OrganizationSchema=mongoose.Schema(
	{
		creator:{
			type: mongoose.Schema.ObjectId
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
		organizations:{
			type:[mongoose.Schema.ObjectId]
		}
	}
);

export const User = mongoose.model('User', UserSchema);
export const Organization = mongoose.model('Organization', OrganizationSchema);