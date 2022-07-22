import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsSignedInContext, NotificationContext } from '../App';
import { signIn } from '../firbase';
import { login } from '../_requests';

function Login() {
    const [notification,setNotification]=useContext(NotificationContext) 
    const [isSignedIn,setIsSignedIn]=useContext(IsSignedInContext)
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const token=localStorage.getItem('token')
    const handleLogin=(e)=>{
        e.preventDefault();
        signIn(email,password,localStorage.getItem('token'))
            .then((res)=>{
                console.log(res)
                localStorage.setItem('token',res.token)
                setIsSignedIn(true)
                setNotification([...notification,'Logged insuccessfully'])
                navigate('/home');
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