import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectdb.js';
import { bossRouter, workerRouter } from './_routes/routes.js';
import WebSocket, { WebSocketServer } from 'ws' ;

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/boss',bossRouter);
app.use('/worker',workerRouter);

connectDB();

const websocketServer = new WebSocketServer({
    noServer: true
  });
app.listen(PORT,console.log(`server is running on ${PORT}`)).
    on('upgrade',(request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
          websocketServer.emit("connection", websocket, request);
        });
      });
websocketServer.on('connection',(ws)=>{
    ws.on('message',(message)=>console.log(message.toString()))
    ws.on('close',()=>console.log('disconnected successfully'))
})