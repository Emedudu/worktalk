import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const BossLogin = () => {
	return(
		<Paper>
			<form>
				<TextField 
				variant = 'outlined'
				defaultValue = 'BOSS ID'
				label = 'Boss Id'
				required
				/>
				<TextField 
				variant = 'outlined'
				defaultValue = 'PASSWORD'
				label = 'Password'
				type = 'password'
				required
				/>
			</form>
		</Paper>
    );
}
export default BossLogin;