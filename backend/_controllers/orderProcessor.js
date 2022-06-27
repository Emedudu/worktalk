import { Message, Organization, User } from "../_models/models.js"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { google } from "googleapis"
import dotenv from "dotenv";

const OAuth2 = google.auth.OAuth2;
dotenv.config()
const secret=process.env.SECRET;

export const getState=async(req,res)=>{
	try {
		const {organizationId}=req.query
		if (organizationId){
			const organization=await Organization.findById(organizationId)
			return res.status(200).json(organization)
		}
		const id=req.user.user_id
		const user=await User.findById(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json("internal server error")
	}
}
export const sendMail=(email,subject,file)=>{
	const createTransporter = async () => {
		const oauth2Client = new OAuth2(
		  process.env.CLIENT_ID,
		  process.env.CLIENT_SECRET,
		  "https://developers.google.com/oauthplayground"
		);
	  
		oauth2Client.setCredentials({
		  refresh_token: process.env.REFRESH_TOKEN
		});
	  
		const accessToken = await new Promise((resolve, reject) => {
		  oauth2Client.getAccessToken((err, token) => {
			if (err) {
			  reject();
			}
			resolve(token);
		  });
		});
	  
		const transporter = nodemailer.createTransport({
		  service: "gmail",
		  auth: {
			type: "OAuth2",
			user: process.env.EMAIL,
			accessToken,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN
		  }
		});
	  
		return transporter;
	};
	const sendEmail = async (emailOptions) => {
		let emailTransporter = await createTransporter();
		await emailTransporter.sendMail(emailOptions,(error, info)=>{
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
	};
	sendEmail({
	subject: subject,
	html: file,
	to: email,
	from: process.env.EMAIL
	});
}
export const signToken=(user_id,email)=>{
	// create a jwt token
	const token = jwt.sign(
		{ user_id, email },
		secret,
		{
			expiresIn: "2h",
		}
	);
	return token
}
export const hashPassword=(password)=>{
	// hash the password
	const hashedPassword = bcrypt.hashSync(password, 8);
	return hashedPassword
}
export const validatePassword=(password,hashedPassword)=>{
	return bcrypt.compareSync(password, hashedPassword)
}
export const getMessages=async(req,res,next)=>{
	const {user_id,email}=req.user;
	const {to}=req.body
	try{
		const messages=await Message.find({
			$or:[
				{from:user_id,to:to},
				{from:to,to:user_id}
			]
		}
		)
		return res.status(200).json(messages)
	}catch(error){
		res.status(500).json("Internal Server Error")
	}
}


// LATER.....
// TODO: implement this function
export const bossRequest=(req,res,next)=>{
	const {skills,location,level}=req.body

}