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