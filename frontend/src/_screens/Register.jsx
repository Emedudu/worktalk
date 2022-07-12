import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register=({setMessage})=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    // I'll later make password strong with regex
    const [password,setPassword]=useState('')
    // will later use geolocation api or use a dropdown select for the location
    const [location,setLocation]=useState('')
    const register=(e)=>{
        e.preventDefault();
        axios.post('/user/register',{email,name,password,location})
            .then((res)=>{
                if(res.data.auth){
                    localStorage.setItem('token',res.data.token)
                    navigate('/home');
                }else{
                    setMessage('Error Registering')
                }
            })
    }
    return (
        <div>
            <input
                onChange={(e)=>setEmail(e.target.value)}
                placeholder='Enter your email'
                className='form-control'
                value={email}
                type='email'
            />
            <input
                onChange={(e)=>setName(e.target.value)}
                placeholder='Enter your full name'
                className='form-control'
                value={name}
                type='text'
            />
            <input
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter a strong password'
                className='form-control'
                type='password'
            />
            <input
                onChange={(e)=>setLocation(e.target.value)}
                placeholder='Enter your location'
                className='form-control'
                value={location}
                type='text'
            />
            <button 
            type='button' 
            className='btn btn-primary' 
            onClick={register}>
                REGISTER
            </button>
            <Link to='/'>Login</Link>
        </div>
    );
}

export default Register;