import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { NotificationContext } from '../App';
import { getState } from '../_requests';

function Organization(props) {
    const [notification,setNotification]=useContext(NotificationContext)
    const {id}=props
    const [details,setDetails]=useState({})
    useEffect(()=>{
        getState(localStorage.getItem('token'),id)
            .then(res=>setDetails(res.data))
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    return (
        <div style={{backgroundImage:`url(${details.image})`,opacity:0.2, backgroundSize:'cover'}}>
            <div>
                <p>bfgkfkv</p>
            </div>
        </div>
    );
}
export default Organization;