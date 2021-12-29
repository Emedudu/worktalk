import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const WorkerSuccessLogin = () => {
	return(
		<Container>
			<Typography variant = 'h3'>
				You are logged in successfully
			</Typography>
			<Button variant = 'contained' color = 'primary'>
				Continue
			</Button>
		</Container>

		);
}
export default WorkerSuccessLogin;