import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectdb.js';
import { organizationRouter, userRouter } from './_routes/routes.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user',userRouter)
app.use('/organization',organizationRouter)

const startServer=async()=>{
    try{
        await connectDB();
        app.listen(PORT,console.log(`server is running on ${PORT}`))
    
    }catch(err){
        console.log('Error Connecting to Database')
    }
}
startServer()
