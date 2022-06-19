import {User} from '../_models/user.js';
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config();

export const register =  async (req,res)=>{
	try{
		const {email,name,password,location} = req.body;
		
		if (!(email && name && password && location)) {
			res.status(400).send("All params required");
		}
		const newUser = await new User({
			email,
			name,
			password,
			location,
			skills:[],
			bosses:[],
			workers:[]
		});
		const savedUser = await newUser.save();
		const token = jwt.sign(
			{ user_id: savedUser._id, email },
			process.env.SECRET,
			{
			  expiresIn: "2h",
			}
		);
		res.status(200).json({token});
	}catch(err){
		res.status(400);
	}
}
