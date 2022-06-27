import { Message, Organization, User } from "../_models/user.js"
import mongoose from "mongoose"
import nodemailer from "nodemailer"
import { google } from "googleapis"
import dotenv from "dotenv";
const OAuth2 = google.auth.OAuth2;
dotenv.config()

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

// TODO: implement this function
export const message=async(req,res,next)=>{
	const {user_id,email}=req.user;
	const {to,message}=req.body;
	const ObjectId = mongoose.Types.ObjectId;
	const objId = new ObjectId(to);
	try {
		const newMessage=await Message.create({
			from:user_id,
			to:objId,
			message,
			timestamp:Date.now()
		})
		res.status(200).json("Message sent successfully")
	} catch (error) {
		res.status(500).json("Internal Server Error")
	}
}
export const getMessages=async(req,res,next)=>{
	const {user_id,email}=req.user;
	const {to}=req.body
	try{
		const messages=await Message.find({
			$or:[
				{from:user_id},
				{from:to}
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