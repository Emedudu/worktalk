import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Button from '@material-ui/core/Button';


const BossLogin = () => {
	const [bossID,setBossID] = useState('')
	const [password,setPassword] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post('http://localhost:8001/boss/login',{bossID,password},{
	      headers: {
	        'Content-Type': 'application/json',
	      },
	    })
			.then((res)=> console.log(res.data))
	}
	return(
		<Paper>
			<form onSubmit = {handleSubmit}>
				<TextField 
				variant = 'outlined'
				defaultValue = '61bb46b6dc34db7ea808f4d6'
				label = 'Boss Id'
				onFocus = {(e) => {setBossID(e.target.defaultValue)}}
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'justtry'
				label = 'Password'
				type = 'password'
				onFocus = {(e) => {setPassword(e.target.defaultValue)}}
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