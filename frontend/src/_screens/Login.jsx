import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({setMessage}) {
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
            <Link to='/register'>Register</Link>
        </div>
    );
}

export default Login;