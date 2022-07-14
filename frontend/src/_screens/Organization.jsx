import React, { useState } from 'react';
import { useEffect } from 'react';
import { getState } from '../_requests';

function Organization(props) {
    const {id,notification,setNotification}=props
    const [details,setDetails]=useState({})
    useEffect(()=>{
        getState(localStorage.getItem('token'),id)
            .then(res=>setDetails(res.data))
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    return (
        <div style={{backgroundImage:`url(${details.image})`,backgroundSize:'cover'}}>
            <div>
                what is going on
            </div>
        </div>
    );
}
export default Organization;