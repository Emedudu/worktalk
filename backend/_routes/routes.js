import express from 'express';
import { register,login } from '../_controllers/dbControllers.js';

export const userRouter = express.Router();

userRouter.route('/register').post(register);
userRouter.route('/login').post(login);
// userRouter.route('/createOrganization'.post(createOrganization))
// route for boss only 
// userRouter.route('/registerEmployee'.post(registerEmployee))

