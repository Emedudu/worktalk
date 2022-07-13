import React from 'react';
import { useEffect } from 'react';
import { getState } from '../_requests';

const HomeScreen=(props)=>{
    
    const token=localStorage.getItem('token')
    useEffect(()=>{
        getState(token)
            .then((res)=>console.log(res.data))
    })
    return (
        <div>
            
            <div>

            </div>
            
        </div>
    );
}

export default HomeScreen;