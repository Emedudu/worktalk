import { User } from "../_models/user.js"

export const getState=async(req,res)=>{
	try {
		const id=req.user.user_id
		const user=await User.findById(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json("internal server error")
	}
}