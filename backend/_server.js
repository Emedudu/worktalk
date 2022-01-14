import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectdb.js';
import { bossRouter, workerRouter } from './_routes/routes.js';
import { connectServer } from './_controllers/webSocketController.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('/boss',bossRouter);
app.use('/worker',workerRouter);

connectDB();


connectServer(app.listen(PORT,console.log(`server is running on ${PORT}`)))
