import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { history } from '../App.js';

const BossLogin = () => {
	const [bossID,setBossID] = useState('')
	const [password,setPassword] = useState('')
	
	const handleSubmit = async(event) => {
		event.preventDefault();
		try{
			const res = await axios.post('http://localhost:8001/boss/login',{bossID,password},{
		      headers: {
		        'Content-Type': 'application/json',
		      },
		    });
		    const data = res.data;
		    (data==='true') ? window.localStorage.setItem(isLogin,true):window.localStorage.setItem(isLogin,false)
			history.push('/successLogin');

		}catch(err){console.log('error occurred')}
			
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