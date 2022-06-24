import {Organization, User} from '../_models/user.js';
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendMail } from './orderProcessor.js';
import { htmlJoin, htmlQuit } from '../constants.js';

dotenv.config();
const secret=process.env.SECRET;
const pass=process.env.PASS;
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
		if (!passwordIsValid) return res.status(401).send({ auth: false });
	
		const token = jwt.sign({ user_id: user._id }, secret, {
			expiresIn: '2h' // expires in 2 hours
		});
		res.status(200).json({ auth: true, token});
	} catch (error) {
		res.status(500).json("internal server error")
	}
}
export const createOrganization=async(req,res)=>{
	try {
		const {name,description,passCode}=req.body
		const id=req.user.user_id
		const email=req.user.email
		if(!(name&&description&&passCode))return res.status(400).json('All parameters are required')
		const hashedPassCode = bcrypt.hashSync(passCode, 8);
		const newOrganization = await Organization.create({
			name,
			description,
			creator:id,
			owner:id,
			ownerEmail:email,
			passCode:hashedPassCode,
			skillPool:[],
			allMembers:[],
			level0:[],
			level1:[],
			level2:[],
			level3:[],
			level4:[],
			level5:[],
		});
		// add organization to User document
		const user=await User.findById(id)
		await User.findByIdAndUpdate(id,{organizations:[...user.organizations,newOrganization._id]})
		res.status(200).json('Organization Created Successfully')
		// anyone can create an organisation
		// the creator can create a token to give admin roles to selected individuals
		// const token=jwt.sign({org_id:newOrganization._id,passCode},pass,{expiresIn:'2d'})
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const changePassCode=async(req,res,next)=>{
	const {formerPassCode,newPassCode,organizationId}=req.body;
	const {user_id,email}=req.user
	const organization=await Organization.findById(organizationId)
	if(!organization)return res.status(400).json("Organization does not exist")
	if(organization.owner!=user_id)return res.status(400).json('You do not have the right to this organization')
	if(!formerPassCode){
		if (organization.ownerEmail==email){
			// send email to him 
			return res.status(200).json('Check your email')
		}
		res.status(400).json('Incorrect Email')
	}
	const passCodeIsValid = bcrypt.compareSync(formerPassCode, organization.passCode);
	if (!passCodeIsValid) return res.status(401).json('incorrect passCode');
	if(!newPassCode)return res.status(400).json('A new passcode is required')
	const hashedPassCode = bcrypt.hashSync(newPassCode, 8);
	try {
		await Organization.findByIdAndUpdate(organizationId,{passCode:hashedPassCode})
		res.status(200).json('Password updated successfully')
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
}
export const changeParameter=async(req,res,next)=>{
	const {name,description,organizationId}=req.body
	const {user_id,email}=req.user
	if(!(name||description))return res.status(400).json("Enter name or description")
	const organization=await Organization.findById(organizationId)
	if(!organization)return res.status(400).json("Organization does not exist")
	if(organization.owner!=user_id)return res.status(400).json('You do not have the right to this organization')
	try {
		await Organization.findByIdAndUpdate(organizationId,{name,description})	
		res.status(200).json('Name and Description updated successfully')
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}

}
export const addToOrganization=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {newComerEmail,newComerId,organizationId}=req.body
		if(!newComerEmail)return res.status(400).json("Enter email of new Employee")
		const organization=await Organization.findById(organizationId)
		if(!organization)return res.status(400).json("Organization does not exist")
		if(organization.owner!=user_id)return res.status(400).json("You don't have the permission to add to organization")
		// send email to recipient
		try {
			if(organization.allMembers.includes(newComerId))return res.status(400).json("This user is already part of the organization")
			// message the person
			await sendMail(newComerEmail,`Invitation to join ${organization.name}`,htmlJoin(organization.name,organizationId))
			res.status(200).json("Invitation sent")	
		} catch (error) {
			res.status(400).json("Unable to send invitation")
		}
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const acceptInvite=async(req,res,next)=>{
	try {
		const {organizationId,level}=req.body
		let leve=level
		if(!leve){leve="level5"}
		const {user_id,email}=req.user
		try {
			const user=await User.findById(user_id)
			await User.findByIdAndUpdate(user_id,{organizations:[...user.organizations,organizationId]})
			const organization=await Organization.findById(organizationId)
			await Organization.findByIdAndUpdate(organizationId,{
				skillPool:[...new Set(organization.skillPool.concat(user.skills))],
				allMembers:[...organization.allMembers,newComerId],
				[`${leve}`]:[...organization[`${leve}`],newComerId]
			})
			res.status(200).json('Congratulations, You are now part of the Organization')		
		} catch (error) {
			res.status(400).json("Unable to update information")
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
}
export const quitOrganization=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {organizationId,level}=req.body
		if(!(organizationId&&level))return res.status(400).json("All params are required")
		try {
			const user=await User.findById(user_id)
			await User.findByIdAndUpdate(user_id,{organizations:user.organizations.filter(org_id=>org_id!=organizationId)})
			const organization=await Organization.findById(organizationId)
			const orgOwner=await User.findById(organization.owner)
			await sendMail(orgOwner.email,`Request to quit ${organization.name}`,htmlQuit())
			res.status(200).json("Request sent")	
		} catch (error) {
			res.status(400).json("Unable to quit organization")
		}
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const removeEmployee=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {organizationId,employeeId,level}=req.body
		let leve=level
		if(!(employeeId&&leve))return res.status(400).json("User id and level required")
		const organization=await Organization.findById(organizationId)
		if(organization.owner!=user_id)return res.status(400).json("Only Owner of this organization can change information")
		try {
			await Organization.findByIdAndUpdate(organizationId,{
				allMembers:organization.allMembers.filter(empId=>empId!=employeeId),
				[`${leve}`]:organization[`${leve}`].filter(empId=>empId!=employeeId)
			})
			res.status(200).json('You have successfully removed this worker from the organization')		
		} catch (error) {
			res.status(400).json("Unable to update information")
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
}
// TODO: implement this function
export const promoteEmployee=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {newComerEmail,organizationId}=req.body
		if(!newComerEmail)return res.status(400).json("Enter email of new Employee")
		const organization=await Organization.findById(organizationId)
		if(!organization)return res.status(400).json("Organization does not exist")
		if(organization.owner!=user_id)return res.status(400).json("You don't have the permission to add to organization")
		// send email to recipient
		try {
			await sendMail(newComerEmail,`Invitation to join ${organization.name}`,htmlCode(organization.name,organizationId))
			res.status(200).json("Invitation sent")	
		} catch (error) {
			res.status(400).json("Unable to send invitation")
		}
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
// TODO: implement this function
export const acceptPromotion=async(req,res,next)=>{
	try {
		const {organizationId,level}=req.body
		let leve=level
		if(!leve){leve="level5"}
		const {user_id,email}=req.user
		// const organization=await Organization.findById(organizationId)

		await Organization.findByIdAndUpdate(organizationId,{[`${leve}`]:!(organization[`${leve}`].includes(user_id))&&[...organization[`${leve}`],user_id]})
		const user=await User.findById(user_id)
		await User.findByIdAndUpdate(user_id,{organizations:[...user.organizations,organizationId]})
		res.status(200).json('Congratulations, You are now part of the Organization')
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
}
// TODO: implement this function
export const sellOwnerRight=async(req,res,next)=>{
	// buyer is an id may later change to email
	const {buyer}=req.body

}