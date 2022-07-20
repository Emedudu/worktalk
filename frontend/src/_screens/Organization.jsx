import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { NotificationContext } from '../App';
import { getState } from '../_requests';

function Organization(props) {
    const [notification,setNotification]=useContext(NotificationContext)
    const [details,setDetails]=useState({})
    useEffect(()=>{
        getState(localStorage.getItem('token'),sessionStorage.getItem('org'))
            .then(res=>setDetails(res.data))
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    return (
        <div style={{backgroundImage:`url(${details.image})`, backgroundSize:'contain', minHeight:'100vh'}}>
            <h1 className='text-light'>here I am</h1>
        </div>
    );
}
export default Organization;