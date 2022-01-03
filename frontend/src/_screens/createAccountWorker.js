import React, { useState, useEffect }from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ListOfSkills = ({listOfSkillNumbers,skillset})=>{
	const listOfSkills = listOfSkillNumbers.map(
		(elem,i)=>{
			return(
				<TextField
				variant = 'outlined'
				label = {`skill ${i+1}`}
				type = 'text'
				key = {i}
				onChange = {(e) =>{
					e.preventDefault();
					skillset[i]=e.target.value
				}}
				required
				/>
			)
		}
	)
	return(
		<>
			{listOfSkills}
		</>
	)};

const CreateAccountWorker = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');
	const [bossID, setBossID] = useState('');
	const [skillsetNumber, setSkillsetNumber] =useState(0);
	const [response, setResponse] = useState('');
	const [buttonStatus,setButtonStatus] = useState(true)

	const listOfSkillNumbers = [];
	const skillset = [];
	for (let i = 0;i<skillsetNumber;i++){
		listOfSkillNumbers.push(i);
	
	}

	useEffect(()=>{
		if (response){
			setButtonStatus(false);
		}
	},[response,setButtonStatus])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			headers : {
				"Content-Type":"application/json"
			}
		}
		try{
			const res = await axios.post(
				'http://localhost:8001/worker/post',
				{name, password, location,bossID,skillset},
				config);
			setResponse(res.data);

		}catch(err){console.log(err)}

	}
	const getLocation = (e) => {
		const location = navigator.geolocation.getCurrentPosition(position => setLocation(`[${position.coords.latitude},${position.coords.longitude}]`));
		location!==undefined ? 
			setLocation(location):
				setLocation('undefined');
	}
	return(
		<Container>
			<form onSubmit = {handleSubmit}>
				<TextField
				variant = 'outlined'
				label = 'Name'
				onBlur = { (e)=> {setName(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				label = 'Password'
				type = 'password'
				onBlur = { (e)=> {setPassword(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				label = 'Location'
				onFocus = {getLocation}
				/>
				<TextField
				variant = 'outlined'
				label = 'Boss ID'
				onBlur = { (e)=> {setBossID(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				defaultValue = '0'
				label = 'Number of Skills'
				type = 'number'
				onBlur = { (e)=> {
					e.preventDefault();
					setSkillsetNumber(e.target.value)} 
				}
				required/>
				{<ListOfSkills listOfSkillNumbers = {listOfSkillNumbers} skillset = {skillset}/>}
				<Button variant = 'contained' color = 'primary' type = 'submit'>
					CREATE ACCOUNT
				</Button>
				<Typography variant = 'body1'>
					{response}
				</Typography>
				<Button variant = 'contained' color = 'primary' disabled = {buttonStatus}>
					CONTINUE
				</Button>
			</form>
		</Container>

		);
}
export default CreateAccountWorker;