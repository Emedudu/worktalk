import Boss from '../_models/boss.js';
import Worker from '../_models/worker.js';

export const newBoss =  async (req,res)=>{
	try{
		const { name, password, location } = req.body;
		const newBoss = await new Boss({
			name,
			password,
			location
		});
		const savedBoss = await newBoss.save();
		res.status(200).json(`Your userId is ${savedBoss._id}`);
	}catch(err){
		res.status(400).json('not successful');
	}
}

export const newWorker =  async (req,res)=>{
	try{
		const { name, password, location, bossID, skillset } = req.body;
		const newWorker = await new Worker({
			name,
			password,
			location,
			bossID,
			skillset
		});
		const savedWorker = await newWorker.save();
		res.status(200).json(`Your userId is ${savedWorker._id}`);
	}catch(err){
		res.status(400).json('not successful');
	}
}
export const loginFunc = async (req,res) => {
	try{
		const { bossID, password } = req.body;
		try{
			const bossData = await Boss.findById(bossID);
			const idPassword = bossData.password;
			const correct =  (password === idPassword)
			correct ? res.json('true'):res.json('false')
		}catch(err){
			res.json('false')}
		
		// console.log(pass)
	}catch(err){
		console.log(err)
	}
}