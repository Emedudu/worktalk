import { Button, Container, TextField, Typography } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import ListOfSkills from '../_components/skillset';

const MainScreenBoss = ()=>{
    const [skillsetNumber, setSkillsetNumber] =useState(0);
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState(`I need you at location ${location}`)
    const listOfSkillNumbers = [];
	const skillset = [];
	for (let i = 0;i<skillsetNumber;i++){
		listOfSkillNumbers.push(i);
	
	}
    const ws = new WebSocket('ws://localhost:8001');
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        ws.onopen = (event)=>{
            ws.send({skillset,location,message});
        }
		// const config = {
		// 	headers : {
		// 		"Content-Type":"application/json"
		// 	}
		// }
        // axios.post('http://localhost:8001/worker/post',
        //     {},
        //     config);
        // )
    }
    const getLocation = () => {
		const location = navigator.geolocation.getCurrentPosition(position => setLocation(`[${position.coords.latitude},${position.coords.longitude}]`));
		location!==undefined ? 
			setLocation(location):
				setLocation('undefined');
	}
    return(
        <Container>
            <form onSubmit = {handleSubmit}>
                <Typography variant = 'h3'>Chat Screen</Typography>
                <TextField
				variant = 'outlined'
				defaultValue = '0'
				label = 'Number of Skills'
				type = 'number'
				onInput = { (e)=> {
					e.preventDefault();
					setSkillsetNumber(e.target.value)} 
				}
				required/>
				{<ListOfSkills listOfSkillNumbers = {listOfSkillNumbers} skillset = {skillset}/>}
                <TextField 
                placeholder='Enter location'
                variant = 'outlined'
                onFocus={getLocation}
                />
                <TextField 
                placeholder='Enter message'
                variant = 'outlined'
                onInput = { (e)=> {
					e.preventDefault();
					setMessage(e.target.value)} 
				}
                />
                <Button type='submit' color = 'primary' variant='contained'>
                    ORDER
                </Button>
            </form>
        </Container>
    )
}
export default MainScreenBoss;