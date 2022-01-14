import { WebSocketServer } from 'ws' ;

const websocketServer = new WebSocketServer({
  noServer: true
});
export const connectServer = (server)=>{
    server.on('upgrade',(request, socket, head) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket) => {
          websocketServer.emit("connection", websocket, request);
        });
      });
    }
websocketServer.on('connection',(ws)=>{
  ws.send('hey');
  ws.on('message',(message)=>ws.send(message.toString()))
  ws.on('close',()=>console.log('disconnected successfully'))
})