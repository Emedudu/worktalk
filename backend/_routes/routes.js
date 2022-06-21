import express from 'express';
import { register,login, addToOrganization, createOrganization } from '../_controllers/dbControllers.js';
import { verifyToken } from '../_controllers/middleware.js';
import { getState } from '../_controllers/orderProcessor.js';

export const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/getState').get(verifyToken,getState)
userRouter.route('/createOrganization'.post(verifyToken,createOrganization))
userRouter.route('/addToOrganization').post(verifyToken,addToOrganization)
// route for boss only 
// userRouter.route('/registerEmployee'.post(registerEmployee))

