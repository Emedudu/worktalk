import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Navigation from '../_components/Navigation';
import SideBar from '../_components/SideBar';
import { getState } from '../_requests';

const HomeScreen=(props)=>{
    const [sideBar,setSideBar]=useState(false)
    const token=localStorage.getItem('token')
    useEffect(()=>{
        getState(token)
            .then((res)=>console.log(res.data))
    })
    return (
        <div>
            <Navigation sideBar={sideBar} setSideBar={setSideBar}/>
            {sideBar&&<SideBar/>}
        </div>
    );
}

export default HomeScreen;