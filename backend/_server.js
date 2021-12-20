import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './connectdb.js';
import { bossRouter, workerRouter, homeRouter } from './_routes/routes.js';

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());
app.use('',homeRouter)
app.use('/boss',bossRouter);
app.use('/worker',workerRouter);

connectDB();
app.listen(PORT,console.log(`server is running on ${PORT}`));