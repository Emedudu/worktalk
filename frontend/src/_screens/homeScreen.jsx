import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const HomeScreen = () => {
	return(
		<Container>
			<Link to='/bossLogin'>
				<Button variant = 'contained' color = 'primary'>
					Boss
				</Button>
			</Link>
			<Link to = '/workerLogin'>
				<Button variant = 'contained' color = 'secondary'>
					Worker
				</Button>
			</Link>
		</Container>
		)
}
export default HomeScreen;