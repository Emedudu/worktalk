import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import Navigation from '../_components/Navigation';
import { getState } from '../_requests';

const HomeScreen=(props)=>{
    const token=localStorage.getItem('token')
    useEffect(()=>{
        getState(token)
            .then((res)=>console.log(res.data))
    })
    return (
        <div>
            <Navigation/>
        </div>
    );
}

export default HomeScreen;