import express from 'express';
import { register } from '../_controllers/dbControllers.js';

export const userRouter = express.Router();

userRouter.route('/register').post(register);
// userRouter.route('/login').post(loginFuncBoss);

