import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkerLogin = () => {
	const [workerID, setWorkerId] = useState('');
	const [password, setPassword] = useState('');
	const [bossID, setBossID] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async(event) => {
		event.preventDefault();
		const config = {
			headers : {
				"Content-Type":"application/json"
			}
		}
		try{
			const res = await axios.post('http://localhost:8001/worker/login',{workerID, password, bossID},config);
			res.data === 'true'?
				navigate('/workerSuccessLogin'):
					navigate('/')


		}catch(err){console.log('an error occurred')}
	}

	const createAccount = () => {
		navigate('/createAccountWorker')
	}
	return(
		<Paper>
			<form onSubmit = {handleSubmit}>
				<TextField 
				variant = 'outlined'
				defaultValue = 'WORKER ID'
				label = 'Worker Id'
				onInput = {(e)=>{setWorkerId(e.target.value)}}
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'PASSWORD'
				label = 'Password'
				type = 'password'
				onInput = {(e)=>{setPassword(e.target.value)}}
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'BOSS ID'
				label = 'Boss Id'
				onInput = {(e)=>{setBossID(e.target.value)}}
				required
				/>
				<Button variant = 'contained' color = 'primary' type = 'submit'>
					LOGIN
				</Button>
				<Button variant = 'contained' color = 'secondary' onClick = {createAccount}>
					CREATE ACCOUNT
				</Button>
			</form>
		</Paper>
    );
}
export default WorkerLogin;