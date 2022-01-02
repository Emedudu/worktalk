import React, { useState, useEffect }from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ListOfSkills = ({listOfSkillNumbers})=>{
	const listOfSkills = listOfSkillNumbers.map(
		(elem,i)=>{
			return(
				<TextField
				variant = 'outlined'
				label = {`skill ${i+1}`}
				type = 'text'
				key = {i}
				onChange = {(e) =>{
					listOfSkillNumbers[i]=e.target.value
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
	const [skillset, setSkillset] = useState([]);

	const listOfSkillNumbers = [];

	for (let i = 0;i<skillsetNumber;i++){
		listOfSkillNumbers.push(i);
	
	}

	const handleSubmit = (e) => {
		e.preventDefault();

	}
	const getLocation = () => {
		navigator.geolocation.getCurrentPosition(position => setLocation(`[${position.coords.latitude},${position.coords.longitude}]`))
	
	}
	return(
		<Container>
			<form onSubmit = {handleSubmit}>
				<TextField
				variant = 'outlined'
				defaultValue = 'Name'
				label = 'Name'
				onInput = { (e)=> {setName(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				defaultValue = 'Password'
				label = 'Password'
				type = 'password'
				onInput = { (e)=> {setPassword(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				defaultValue = 'Location'
				label = 'Location'
				onFocus = {getLocation}
				required/>
				<TextField
				variant = 'outlined'
				defaultValue = 'Boss ID'
				label = 'Boss ID'
				onInput = { (e)=> {setBossID(e.target.value)} }
				required/>
				<TextField
				variant = 'outlined'
				defaultValue = '0'
				label = 'Number of Skills'
				type = 'number'
				onInput = { (e)=> {setSkillsetNumber(e.target.value)} }
				required/>
				{<ListOfSkills listOfSkillNumbers = {listOfSkillNumbers}/>}
				<Button variant = 'contained' color = 'primary' type = 'submit'>
					CREATE ACCOUNT
				</Button>
			</form>
		</Container>

		);
}
export default CreateAccountWorker;