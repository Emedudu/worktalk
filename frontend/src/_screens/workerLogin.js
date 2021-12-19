import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const handleSubmit = (event) => {
	event.preventDefault();

}
const WorkerLogin = () => {
	return(
		<Paper>
			<form onSubmit = {handleSubmit} method = 'get'>
				<TextField 
				variant = 'outlined'
				defaultValue = 'WORKER ID'
				label = 'Worker Id'
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'PASSWORD'
				label = 'Password'
				type = 'password'
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'BOSS ID'
				label = 'Boss Id'
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
export default WorkerLogin;