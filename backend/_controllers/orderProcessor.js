import { User } from "../_models/user.js"
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config()

export const getState=async(req,res)=>{
	try {
		const id=req.user.user_id
		const user=await User.findById(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json("internal server error")
	}
}
export const sendMail=(email,subject,file)=>{
	console.log(process.env.EMAIL,process.env.PASSWORD)
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
		  user: `${process.env.EMAIL}`,
		  pass: `${process.env.PASSWORD}`
		}
	  });
	  
	let mailOptions = {
		from: process.env.EMAIL,
		to: email,
		subject: subject,
		text: file
	};
	
	transporter.sendMail(mailOptions, (error, info)=>{
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}