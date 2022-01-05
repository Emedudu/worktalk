import express from 'express';
import { newBoss, newWorker, loginFunc, loginFuncWorker, chatFunc } from '../_controllers/dbControllers.js';

export const bossRouter = express.Router();

bossRouter.route('/post').post(newBoss);
bossRouter.route('/login').post(loginFunc);
bossRouter.route('/chat').get(chatFunc);

export const workerRouter = express.Router();

workerRouter.route('/post').post(newWorker);
workerRouter.route('/login').post(loginFuncWorker);
