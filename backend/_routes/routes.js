import express from 'express';
import { register,login, addToOrganization, createOrganization, changePassCode, acceptInvite, changeParameter, quitOrganization, removeEmployee } from '../_controllers/dbControllers.js';
import { verifyToken } from '../_controllers/middleware.js';
import { getState } from '../_controllers/orderProcessor.js';

export const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/getState').get(verifyToken,getState)
userRouter.route('/createOrganization').post(verifyToken,createOrganization)
userRouter.route('/changePassCode').post(verifyToken,changePassCode)
userRouter.route('/changeParameter').post(verifyToken,changeParameter)
userRouter.route('/addToOrganization').post(verifyToken,addToOrganization)
userRouter.route('/acceptInvite').post(verifyToken,acceptInvite)
userRouter.route('/quitOrganization').delete(verifyToken,quitOrganization)
userRouter.route('/removeEmployee').delete(verifyToken,removeEmployee)
// route for boss only 
// userRouter.route('/registerEmployee'.post(registerEmployee))

