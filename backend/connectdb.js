import mongoose from 'mongoose';

const connectDB = async () => {
	try{
		await mongoose.connect(process.env.MONGO_URI_LOCAL, {
      		useUnifiedTopology: true,
    	});
	}catch(err){
		console.log(`error ${err}`);
	}
}
export default connectDB;