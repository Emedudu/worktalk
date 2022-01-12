import { Container, TextField, Typography } from '@material-ui/core';
import React from 'react';

const MainScreenBoss = ()=>{
    const webSocketConnect = async()=>{
        const ws = new WebSocket('ws://localhost:8001');
        ws.onopen = (event)=>{
            console.log(event);
        }
    }
    webSocketConnect();
    return(
        <Container>
            <Typography variant = 'h3'>Chat Screen</Typography>
            <TextField
            placeholder='Enter skills'
            variant = 'outlined'
            />
            <TextField 
            placeholder='Enter location'
            variant = 'outlined'
            />

        </Container>
    )
}
export default MainScreenBoss;