import Boss from '../_models/boss.js';
import Worker from '../_models/worker.js';

export const newBoss =  async (req,res)=>{
	const { name, password, location } = req.body;
	const newBoss = await new Boss({
		name,
		password,
		location
	});
	const savedBoss = await newBoss.save();
	res.json(`Your userId is ${savedBoss._id}`);
}

export const newWorker =  async (req,res)=>{
	const { name, password, location, bossID, skillset } = req.body;
	const newWorker = await new Worker({
		name,
		password,
		location,
		bossID,
		skillset
	});
	const savedWorker = await newWorker.save();
	res.json(`Your userId is ${savedWorker._id}`);
}
export const loginFunc = async (req,res) => {
	const { bossID, password } = req.body;
	const bossData = await Boss.findById({_id:bossID});
	const pass = await bossData.password
	// ( password === pass )?res.json('logged in successfully'):res.json('username and password are incorrect')
	console.log(pass)
}