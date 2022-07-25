import express from 'express';
import { verifyToken } from '../_controllers/middleware.js';
import { getMessages, getState } from '../_controllers/orderProcessor.js';
import { register,
        login, 
        addToOrganization, 
        createOrganization, 
        changePassCode, 
        acceptInvite, 
        changeParameter, 
        quitOrganization, 
        removeEmployee, 
        deleteOrganization, 
        message, 
        deleteUser, 
        promoteEmployee, 
        updateUserParams, 
        transferOwnership, 
        getUsersIPFSHash} from '../_controllers/dbControllers.js';

export const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
userRouter.route('/deleteUser').post(verifyToken,deleteUser);
userRouter.route('/getState').get(verifyToken,getState)
userRouter.route('/acceptInvite').post(verifyToken,acceptInvite)
userRouter.route('/quitOrganization').delete(verifyToken,quitOrganization)
userRouter.route('/message').post(verifyToken,message)
userRouter.route('/getMessages').post(verifyToken,getMessages)
userRouter.route('/updateParams').post(verifyToken,updateUserParams)
userRouter.route('/getIPFSHash').post(verifyToken,getUsersIPFSHash)

export const organizationRouter=express.Router();

organizationRouter.route('/createOrganization').post(verifyToken,createOrganization)
organizationRouter.route('/deleteOrganization').delete(verifyToken,deleteOrganization)
organizationRouter.route('/changePassCode').post(verifyToken,changePassCode)
organizationRouter.route('/changeParameter').post(verifyToken,changeParameter)
organizationRouter.route('/addToOrganization').post(verifyToken,addToOrganization)
organizationRouter.route('/removeEmployee').delete(verifyToken,removeEmployee)
organizationRouter.route('/promoteEmployee').post(verifyToken,promoteEmployee)
organizationRouter.route('/transferOwnership').post(verifyToken,transferOwnership)

// route for boss only 
// userRouter.route('/registerEmployee'.post(registerEmployee))

