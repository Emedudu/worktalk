import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {create as ipfsHttpClient} from 'ipfs-http-client'

import { IsSignedInContext, NotificationContext } from '../App';
import { signUp } from '../firbase';

const client=ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Register=(props)=>{
    const [notification,setNotification]=useContext(NotificationContext)
    const [isSignedIn,setIsSignedIn]=useContext(IsSignedInContext)
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    // I'll later make password strong with regex
    const [password,setPassword]=useState('')
    // will later use geolocation api or use a dropdown select for the location
    const [location,setLocation]=useState('')
    const [nickName,setNickname]=useState('')
    const [avatar,setAvatar]=useState('')
    const register=async(e)=>{
        e.preventDefault();
        let res
        if(nickName||avatar){
            try {
                let metadata=JSON.stringify({nickName,avatar})
                res=await client.add(metadata)
            } catch (error) {
                setNotification([...notification,'Error uploading Image please try using a computer'])
            }
        }
        signUp(email,password,name,location,res.path)
            .then((res)=>{
                console.log(res)
                localStorage.setItem('token',res.token)
                localStorage.setItem('userId',res.userId)
                setIsSignedIn(true)
                setNotification([...notification,'Registered successfully'])
                navigate('/home');
            })
            .catch((err)=>{
                setNotification([...notification,'Error Registering'])
            }
        )
    }
    const setFileFromInput=(e)=>{
        const fileForUpload=e.target.files[0]
        const reader  = new FileReader();
        reader.onload=(e)=>{
            const readFile=e.target.result
            readFile&&setAvatar(readFile)
        }
        reader.readAsDataURL(fileForUpload)   
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
            <input
                onChange={(e)=>setNickname(e.target.value)}
                placeholder='Enter a nickname'
                className='form-control'
                value={nickName}
                type='text'
            />
            <input 
            onChange={setFileFromInput}
            type='file'
            placeholder='Choose an Avatar'
            className="form-control"
            accept="image/*"
            />
            <button 
            type='button' 
            className='btn btn-primary' 
            onClick={register}>
                REGISTER
            </button>
        </div>
    );
}

export default Register;