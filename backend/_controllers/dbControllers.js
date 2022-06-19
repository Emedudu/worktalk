import {User} from '../_models/user.js';
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
const secret=process.env.SECRET;
export const register =  async (req,res)=>{
	try{
		// destructure the request parameters
		const {email,name,password,location} = req.body;
		// make sure all required params are given
		if (!(email && name && password && location)) {
			res.status(400).send("All params required");
		}
		// require the email does not exist
		const exists=await User.findOne({email})
		if (exists){
			res.status(400).json('User Already Exists')
		}
		// hash the password
		const hashedPassword = bcrypt.hashSync(password, 8);
		// create the user
		const newUser = await User.create({
			email,
			name,
			password:hashedPassword,
			location,
			skills:[],
			organizations:[]
		});
		// create a jwt token
		const token = jwt.sign(
			{ user_id: newUser._id, email },
			secret,
			{
				expiresIn: "2h",
			}
		);
		// send the token to the user
		res.status(200).json({auth:true,token});
	}catch(err){
		res.status(400);
	}
}
export const login=async(req,res)=>{
	try {
		const {email,password}=req.body
		const user=await User.findOne({email})
		if (!user) return res.status(404).json('No User Found')

		const passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) return res.status(401).send({ auth: false, token });
	
		const token = jwt.sign({ user_id: user._id }, secret, {
			expiresIn: '2h' // expires in 2 hours
		});
		res.status(200).json({ auth: true, token});
	} catch (error) {
		res.status(500).json("internal server error")
	}
}
export const registerWorker=async()=>{
	try {
		
	} catch (error) {
		
	}
}
