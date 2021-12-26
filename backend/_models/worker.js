import mongoose from 'mongoose';

const WorkerSchema = mongoose.Schema(
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
		},
		bossID: {
			type: String,
			required: true,
			unique: false
		},
		skillset: {
			type: [String],
			required: true
		}
	}
);

const Worker = mongoose.model('Worker', WorkerSchema);

export default Worker;