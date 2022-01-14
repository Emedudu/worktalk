import mongoose from 'mongoose';

const BossOrderSchema = mongoose.Schema(
	{
		message:{
			type: String,
			required: true
		},
		timestamp:{
			type: String,
			required: true
		},
		to:{
			type: String,
			required: true
		},
        from:{
            type:String,
            required: true
        }
	}
);

const BossOrder = mongoose.model('BossOrder', BossOrderSchema);

export default BossOrder;