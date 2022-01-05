import React from 'react';
import axios from 'axios';

const MainScreenBoss = ()=>{
    axios.get('http://localhost:8001/boss/chat')
        .then( res => {
            const ws = new WebSocket('ws://localhost:8009')
        }
    )
    return(
        <>
        
        </>
    )
}
export default MainScreenBoss;