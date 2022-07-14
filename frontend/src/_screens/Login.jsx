import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../_requests';

function Login(props) {
    const {notification,setNotification,setIsSignedIn}=props    
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const token=localStorage.getItem('token')
    const handleLogin=(e)=>{
        e.preventDefault();
        login(token,email,password)
            .then((res)=>{
                if(res.data.auth){
                    localStorage.setItem('token',res.data.token)
                    setIsSignedIn(true)
                    setNotification([...notification,'Logged in successfully'])
                    navigate('/home');
                }else{
                    setNotification([...notification,'Error Logging in'])
                }
            })
            .catch((err)=>{
                setNotification([...notification,'Error logging in'])
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
            onClick={handleLogin}>
                LOGIN
            </button>
        </div>
    );
}

export default Login;