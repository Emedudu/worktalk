import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const BossLogin = () => {
	const [bossID,setBossID] = useState('')
	const [password,setPassword] = useState('')
	const navigate = useNavigate();
	const handleSubmit = async(event) => {
		event.preventDefault();
		try{
			const config = {
				headers:
				{"Content-Type":"application/json"}
			};
			const res = await axios.post('http://localhost:8001/boss/login',{bossID,password},config)
			res.data === 'true' ?
				navigate('/successLogin'):
					navigate('/')

		}catch(err){console.log(err)}
			
	}
	return(
		<Paper>
			<form onSubmit = {handleSubmit}>
				<TextField 
				variant = 'outlined'
				label = 'Boss Id'
				onInput = {(e) => {setBossID(e.target.value)}}
				required
				/>
				<TextField 
				variant = 'outlined'
				label = 'Password'
				type = 'password'
				onInput = {(e) => {setPassword(e.target.value)}}
				required
				/>
				<Button variant = 'contained' color = 'primary' type = 'submit'>
					LOGIN
				</Button>
				<Button variant = 'contained' color = 'secondary'>
					CREATE ACCOUNT
				</Button>
			</form>
		</Paper>
    );
}
export default BossLogin;