import { WebSocketServer } from 'ws' ;
import BossOrder from '../_models/bossToWorker.js';
import { ProcessOrder } from './orderProcessor.js';

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
  ws.on('message',async(order)=>{
    const frontendForm = JSON.parse(order);
    const skillset = frontendForm.skillset;
    const location = frontendForm.location.toString();
    const message = frontendForm.message.toString();
    const timestamp = frontendForm.date.toString();
    const from = frontendForm.from.toString();
    const fromId = frontendForm.fromId;
    const to = await ProcessOrder(fromId,skillset,location)

    try{
      const newBossOrder = await new BossOrder({message,timestamp,to,from})
      newBossOrder.save()
    }catch(err){console.log('or occured at webSocketController.js')}
  })
  ws.on('close',()=>console.log('disconnected successfully'))
})