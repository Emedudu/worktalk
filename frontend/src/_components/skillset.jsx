import { TextField } from '@material-ui/core';
import React from 'react';

const ListOfSkills = ({listOfSkillNumbers,skillset,setSkillset})=>{
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
					setSkillset([...skillset,e.target.value])
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
	);
}
export default ListOfSkills;