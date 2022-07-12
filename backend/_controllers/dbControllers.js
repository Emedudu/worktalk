import {Message, Organization, User} from '../_models/models.js';
import { hashPassword, sendMail, signToken, validatePassword } from './orderProcessor.js';
import { htmlJoin, htmlQuit } from '../constants.js';
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secret=process.env.SECRET

export const register =  async (req,res)=>{
	try{
		// destructure the request parameters
		const {email,name,password,location} = req.body;
		// make sure all required params are given
		if (!(email && name && password && location))return res.status(400).send("All params required");
		// require the email does not exist
		const exists=await User.findOne({email})
		if (exists) return res.status(400).json('User Already Exists')
		const hashedPassword=hashPassword(password)
		// create the user
		const newUser = await User.create({
			email,
			name,
			password:hashedPassword,
			location,
			skills:[],
			organizations:[],
			timestamp:Date.now()
		});
		const token=signToken(newUser._id,email)
		// send the token to the user
		return res.status(200).json({auth:true,token});
	}catch(err){
		res.status(400);
	}
}
export const login=async(req,res)=>{
	try {
		const token =
		req.body.token || req.query.token || req.headers["x-access-token"];
		const {email,password}=req.body
		if(token){
			const decoded = jwt.verify(token, secret);
			decoded&&res.status(200).json({ auth: true, token});
		}
		const user=await User.findOne({email})
		if (!user) return res.status(404).json('No User Found')

		const passwordIsValid = validatePassword(password, user.password);
		if (!passwordIsValid) return res.status(401).send({ auth: false });
	
		const newToken=signToken(newUser._id,email)
		res.status(200).json({ auth: true, newToken});
	} catch (error) {
		res.status(500).json("internal server error")
	}
}
export const deleteUser=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {password}=req.body
		const user=await User.findById(user_id)
		if(!user)return res.status(400).json("User does not exist")
		const passwordIsValid=validatePassword(password, user.password)
		if(!passwordIsValid)return res.status(401),send("Incorrect password")
		res.status(200).json("User deleted successfully")
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const createOrganization=async(req,res)=>{
	try {
		const {name,description,passCode}=req.body
		const id=req.user.user_id
		const email=req.user.email
		if(!(name&&description&&passCode))return res.status(400).json('All parameters are required')
		const hashedPassCode = hashPassword(passCode)
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
			timestamp:Date.now()
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
export const deleteOrganization=async(req,res,next)=>{
	const {user_id,email}=req.user
	const {organizationId,passCode}=req.body
	try{
		const organization=await Organization.findById(organizationId)
		if(organization.owner!=user_id)return res.status(400).json("You are not allowed to delete this organization")
		const passwordIsValid = validatePassword(passCode, organization.passCode);
		if (!passwordIsValid) return res.status(401).send("Incorrect passcode");
		await Organization.findByIdAndDelete(organizationId)
		res.status(200).json("Deleted Organization Successfully")
	}catch(error){
		res.status(500).json("Unable to Delete organization")
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
	const passCodeIsValid = validatePassword(formerPassCode, organization.passCode);
	if (!passCodeIsValid) return res.status(401).json('incorrect passCode');
	if(!newPassCode)return res.status(400).json('A new passcode is required')
	const hashedPassCode = hashPassword(newPassCode)
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
		const {newComerEmail,newComerId,organizationId,note}=req.body
		if(!newComerEmail)return res.status(400).json("Enter email of new Employee")
		const organization=await Organization.findById(organizationId)
		if(!organization)return res.status(400).json("Organization does not exist")
		if(organization.owner!=user_id)return res.status(400).json("You don't have the permission to add to organization")
		// send email to recipient
		try {
			if(organization.allMembers.includes(newComerId))return res.status(400).json("This user is already part of the organization")
			// message the person
			const newMessage=await Message.create({
				from:user_id,
				to:newComerId,
				message:note,
				group:false,
				timestamp:Date.now()
			})
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
export const message=async(req,res,next)=>{
	const {user_id,email}=req.user;
	const {to,message,isUser}=req.body;
	const ObjectId = mongoose.Types.ObjectId;
	const objId = new ObjectId(to);
	let recipient
	if (isUser){
		recipient=await User.findById(objId)
		if(!recipient)return res.status(400).json("This user does not exist")
	}else{
		recipient=await Organization.findById(objId)
		if(!recipient)return res.status(400).json("This organization does not exist")
	}
	try {
		const newMessage=await Message.create({
			from:user_id,
			to:objId,
			message,
			group:!isUser,
			timestamp:Date.now()
		})
		await sendMail(recipient.email,`Message for you`,htmlMessage(recipient.name))
		res.status(200).json("Message sent successfully")
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const promoteEmployee=async(req,res,next)=>{
	try {
		const {user_id,email}=req.user
		const {employeeId,organizationId,currentLevel,nextLevel,note}=req.body
		const employee=await User.findById(employeeId)
		if(!employee)return res.status(400).json("User does not exist")
		const organization=await Organization.findById(organizationId)
		if(!organization)return res.status(400).json("Organization does not exist")
		if(organization.owner!=user_id)return res.status(400).json("You don't have the permission to promote employees")
		// send email to recipient
		try {
			Organization.findByIdAndUpdate(organizationId,{
				allMembers:organization.allMembers.filter((member)=>member!=employeeId),
				[currentLevel]:organization[currentLevel].filter((member)=>member!=employeeId),
				[nextLevel]:[...organization[nextLevel],employeeId]
			})
			const newMessage=await Message.create({
				from:user_id,
				to:employeeId,
				message:note,
				group:false,
				timestamp:Date.now()
			})
			await sendMail(employee.email,`${organization.name} has a message for you`,htmlMessage(employee.name))
			res.status(200).json("Employee Promoted")	
		} catch (error) {
			res.status(400).json("Unable to promote employee")
		}
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const transferOwnership=async(req,res,next)=>{
	// buyer is an id may later change to email
	const {user_id,email}=req.user
	const {buyerId,organizationId,passCode}=req.body
	const organization=Organization.findById(organizationId)
	if(!organization)return res.status(400).json("This organization does not exist")
	if(organization.owner!=user_id)return res.status(400).json("You are not the owner of this organization")
	const passCodeIsValid=validatePassword(passCode,organization.passCode)
	if(!passCodeIsValid)return res.status(400).json("Incorrect passcode")
	try {
		Organization.findByIdAndUpdate(organizationId,{
			owner:buyerId
		})
		res.status(200).json("You are no longer the owner of this organization")
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const updateUserParams=async(req,res,next)=>{
	const {user_id,email}=req.user
	const {field,value}=req.body
	if(!([skills,organizations].includes(field)))return res.status(400).json("Bad Request")
	try{
		await User.findByIdAndUpdate(user_id,{
			[field]:value
		})	
	}catch(error){
		res.status(500).json("Unable to update parameters")
	}
}
// TODO: implement this function
export const forgotPassword=async(req,res,next)=>{
	const {email}=req.body
	const userFound=await User.find({email})
	if(!userFound)return res.status(400).json("Email is invalid")
	// change the user password
	const placeHolder=`${Math.random()*1000000}`
	User.updateOne({email:userEmail},)
	sendMail(userEmail,"Reset Password",htmlResetPassword(userEmail.name,placeHolder))
}
// Former owner can use the quitOrganization function
// Write a function for forgotPassword
// Write a function for update user parameters. Probably update skill pool of the organizations later