import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { NotificationContext } from '../App';
import { getMessages } from '../firbase';
import { getState } from '../_requests';

function Organization(props) {
    const [notification,setNotification]=useContext(NotificationContext)
    const [details,setDetails]=useState({})
    useEffect(()=>{
        getMessages()
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
        getState(localStorage.getItem('token'),sessionStorage.getItem('org'))
            .then(res=>setDetails(res.data))
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    console.log(details)
    return (
        <div>
            <h1>here I am</h1>
        </div>
    );
}
export default Organization;