import express from 'express';
import { newBoss, newWorker } from '../_controllers/dbControllers.js';

export const bossRouter = express.Router();

bossRouter.route('/post').post(newBoss);

export const workerRouter = express.Router();

workerRouter.route('/post').post(newWorker);

