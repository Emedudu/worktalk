import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateAccountBoss = () => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [location,setLocation] = useState('');
    const [response,setResponse] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const config = {
			headers : {
				"Content-Type":"application/json"
			}
		}
        try{
            const res = await axios.post("http://localhost:8001/boss/post",
                {name, password, location},
                config
            )
            setResponse(res.data)
        }catch(err){console.log(err)}
    }

    const getLocation = () => {
        const location = navigator.geolocation.getCurrentPosition(position => setLocation(`[${position.coords.latitude},${position.coords.longitude}]`));
		location!==undefined ? 
			setLocation(location):
				setLocation('undefined');
    }
    const continueAction = ()=>{
        if (response.success){
            navigate('/mainScreenBoss')
        }
    }
    return(
        <form onSubmit = {handleSubmit}>
            <TextField 
            variant = 'outlined' 
            label = 'Name'
            onChange = { (e) => {setName(e.target.value)} }
            type = 'text'
            required
            />
            <TextField 
            variant = 'outlined' 
            label = 'Password'
            onChange = { (e) => {setPassword(e.target.value)} }
            type = 'password'
            required
            />
            <TextField 
            variant = 'outlined' 
            label = 'Location'
            onFocus = {getLocation}
            />
            <Button 
            variant = 'contained' 
            color = 'primary' 
            type = 'submit'
            >
                CREATE ACCOUNT
            </Button>
            <Typography variant = 'body2'>
                {response.message}
            </Typography>
            <Button 
            variant = 'contained' 
            color = 'primary' 
            onClick = {continueAction}
            >
                CONTINUE
            </Button>
        </form>
    );
}

export default CreateAccountBoss;