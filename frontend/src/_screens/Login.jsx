import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({setMessage,setIsSignedIn}) {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const token=localStorage.getItem('token')
    const login=(e)=>{
        e.preventDefault();
        axios.post('/user/login',{token,email,password})
            .then((res)=>{
                if(res.data.auth){
                    localStorage.setItem('token',res.data.token)
                    setIsSignedIn(true)
                    navigate('/home');
                }else{
                    setMessage('Error Logging in')
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
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter your password'
                className='form-control'
                type='password'
            />
            <button 
            type='button' 
            className='btn btn-primary' 
            onClick={login}>
                LOGIN
            </button>
        </div>
    );
}

export default Login;