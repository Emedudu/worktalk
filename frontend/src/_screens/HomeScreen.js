import React from 'react';
import BossButton from '../_components/home/bossButton.js';
import WorkerButton from '../_components/home/workerButton.js';
import Box from '@material-ui/core/Box'

const HomeScreen = () => {
	return(
		<Box container sx = {{ display: 'flex', flexDirection:'column', justifyContent:'center', alignItems: 'center' }}>
			<BossButton />
			<WorkerButton />
		</Box>
		)
}
export default HomeScreen;