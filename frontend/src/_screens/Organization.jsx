import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { NotificationContext } from '../App';
import { getMessages, setMessage } from '../firbase';
import { getState } from '../_requests';
import { GrSend } from "react-icons/gr";

function Organization(props) {
    const [notification,setNotification]=useContext(NotificationContext)
    const [details,setDetails]=useState({})
    const [text,setText]=useState('')
    useEffect(()=>{
        getState(localStorage.getItem('token'),sessionStorage.getItem('org'))
            .then(res=>{
                setDetails(res.data)
                getMessages(res.data._id)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err))
            })
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    console.log(details)
    const sendMessage=(e)=>{
        e.preventDefault();
        setMessage(text,Date.now(),localStorage.getItem('userId'),details._id)
        setText('')
    }
    return (
        <div className='row'>
            <div className="input-group mb-3 fixed-bottom col-8">
                <input 
                type="text" 
                className="form-control" 
                value={text}
                onChange={e=>setText(e.target.value)}
                placeholder="Recipient's username" 
                />
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={sendMessage}
                    >
                        <GrSend/>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Organization;